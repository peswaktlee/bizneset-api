import type { Context } from 'hono'

import { BusinessModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'

import { 
    BUSINESS_STATUSES, 
    CONTEXT_KEYS, 
    USER_ROLES, 
    VIEW_BUSINESS_SELECTOR 
} from '@/data/constants'

const ViewBusinessEdit = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        const { slug } = await DecodeBody(c)

        const business = await BusinessModel
            .findOne({ Slug: slug })
            .select(VIEW_BUSINESS_SELECTOR)
            .lean()

        if (business) {
            const isNotApproved = business?.Status !== BUSINESS_STATUSES.APPROVED
            const isAdmin = user?.Role === USER_ROLES.ADMIN

            if (isNotApproved || isAdmin) return await HttpResponder({
                c,
                success: true,
                code: 200,
                message: 'business-was-loaded-successfully',
                data: business
            })

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
        Console.Error('ViewBusinessEdit', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-loading-the-business'
        })
    }
}

export default ViewBusinessEdit