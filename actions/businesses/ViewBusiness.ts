import type { Context } from 'hono'

import { BusinessModel, SaveModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'

import { 
    BUSINESS_STATUSES, 
    CONTEXT_KEYS, 
    MODELS, 
    VIEW_BUSINESS_SELECTOR 
} from '@/data/constants'

const ViewBusiness = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        const { slug } = await DecodeBody(c)

        const business = await BusinessModel
            .findOne({ Slug: slug })
            .select(VIEW_BUSINESS_SELECTOR)
            .populate(MODELS.CATEGORY)
            .lean()

        if (business) {
            const isApproved = business?.Status === BUSINESS_STATUSES.APPROVED
            const isPendingButOwner = (business?.Status === BUSINESS_STATUSES.PENDING) && (user?._id?.toString() === business?.User?.toString())

            if (isApproved || isPendingButOwner) {
                if (isApproved) setImmediate(async () => {
                    await BusinessModel.updateOne({ _id: business?._id }, {
                        $inc: { Visits: 1 }
                    })
                })

                const isSaved = await SaveModel.exists({ 
                    Business: business?._id?.toString(), 
                    User: user?._id?.toString()
                })

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-was-loaded-successfully',
                    data: {
                        ...business,
                        Saved: isSaved ? true : false
                    }
                })
            }

            else return await HttpResponder({
                c,
                success: false,
                code: 404,
                data: null,
                message: 'you-are-not-allowed-to-view-this-business'
            })
        }
        
        else return await HttpResponder({
            c,
            success: false,
            code: 404,
            data: null,
            message: 'business-was-not-found-in-the-database'
        })
    }

    catch (error) {
        Console.Error('ViewBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-loading-the-business'
        })
    }
}

export default ViewBusiness