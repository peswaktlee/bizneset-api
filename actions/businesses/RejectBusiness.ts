import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel, UserModel } from '@/data/models'
import { CurrentTimestamp, TimestampPlusDays } from '@/helpers/dates'
import { ObjectId } from '@/helpers/libs/mongo'
import { FormatBusinessTitle } from '@/helpers/businesses'
import { Translation } from '@/helpers/generals'
import { SendEmail } from '@/helpers/libs/resend'
import { OnBusinessRejection } from '@/ui/templates'

import { 
    BUSINESS_STATUSES, 
    CONTEXT_KEYS, 
    FULL_APP_HOST,
    RESEND_FROM_EMAIL 
} from '@/data/constants'

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
                business.Delete_At = TimestampPlusDays(30, 'days')
                business.Updated_At = CurrentTimestamp()
    
                await business.save()

                await UserModel.updateOne(
                    {
                        _id: ObjectId(business?.User?._id?.toString())
                    }, 
                    {
                        HasPendingBusinessSubmission: false
                    }
                )

                if (!business.Mails.OnRejectionMail) {
                    const businessTitle = FormatBusinessTitle(business?.Title)
                    const businessLink = `${FULL_APP_HOST}/${business?.Slug}/edit`

                    const subject = `${business?.User?.Name}, ${Translation('your-business')} "${businessTitle}" ${Translation('is-rejected')} ❌`

                    const onRejectionStatus = await SendEmail({
                        subject,
                        from: `${Translation('app-name')} <${RESEND_FROM_EMAIL}>`,
                        toEmail: business?.User?.Email,
                        template: OnBusinessRejection({
                            subject,
                            userName: business?.User?.Name || '',
                            businessName: businessTitle,
                            businessLink,
                            reasonOfRejection: business.RejectionNote || ''
                        })
                    })

                    if (onRejectionStatus) {
                        business.Mails.OnRejectionMail = true
                        business.Updated_At = CurrentTimestamp()
            
                        await business.save()
                    }
            
                    else Console.Error('ApproveBusiness', 'on_rejection_email_was_not_sent')
                }
    
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