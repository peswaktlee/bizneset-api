import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel, UserModel } from '@/data/models'
import { CurrentTimestamp } from '@/helpers/dates'
import { ObjectId } from '@/helpers/libs/mongo'
import { BUSINESS_STATUSES, CONTEXT_KEYS, USER_ROLES } from '@/data/constants'

const SubmitBusiness = async (c: Context) => {
    try {
        const admin = c.get(CONTEXT_KEYS.ADMIN)

        if (admin) {
            const { businessId, rejectionNote } = await DecodeBody(c)

            const business = await BusinessModel.findOne({ 
                _id: ObjectId(businessId),
                Status: BUSINESS_STATUSES.PENDING
            })
    
            if (business) {
                business.Status = BUSINESS_STATUSES.REJECTED
                business.RejectionNote = rejectionNote
                business.Updated_At = CurrentTimestamp()
    
                await business.save()

                await UserModel.updateOne(
                    {
                        _id: ObjectId(business?.User?.toString())
                    }, 
                    {
                        HasPendingBusinessSubmission: false
                    }
                )
    
                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-has-been-rejected-successfully',
                    data: null
                })
            }
    
            else return await HttpResponder({
                c,
                success: false,
                code: 400,
                data: null,
                message: 'business-could-not-be-found-when-handling-business-rejection'
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 403,
            data: null,
            message: 'user-is-not-authorized-to-handle-businesses-rejections'
        })
    }

    catch (error) {
        Console.Error('SubmitBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'business-could-not-be-handled-for-rejection-for-an-unknown-reason'
        })
    }
}

export default SubmitBusiness