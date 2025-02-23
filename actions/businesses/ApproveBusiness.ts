import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Analytics, Console } from '@/helpers/logs'
import { BusinessModel, UserModel } from '@/data/models'
import { CurrentTimestamp } from '@/helpers/dates'
import { ObjectId } from '@/helpers/libs/mongo'
import { OnBusinessApproval } from '@/ui/templates'
import { SendEmail } from '@/helpers/libs/resend'
import { Translation } from '@/helpers/generals'
import { FormatBusinessTitle } from '@/helpers/businesses'

import { 
    BUSINESS_STATUSES, 
    CONTEXT_KEYS, 
    FULL_APP_HOST, 
    MODELS,
    RESEND_FROM_EMAIL 
} from '@/data/constants'

const ApproveBusiness = async (c: Context) => {
    try {
        const admin = c.get(CONTEXT_KEYS.ADMIN)

        if (admin) {
            const { businessId } = await DecodeBody(c)

            const filters = { 
                _id: ObjectId(businessId),
                Status: BUSINESS_STATUSES.PENDING
            }

            const business = await BusinessModel
                .findOne(filters)
                .populate(MODELS.USER)

            if (business) {
                business.Status = BUSINESS_STATUSES.APPROVED
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

                await Analytics.Increase([
                    'TotalBusinesses'
                ])
                
                if (!business.Mails.OnApprovalMail) {
                    const businessTitle = FormatBusinessTitle(business?.Title)
                    const businessLink = `${FULL_APP_HOST}/${business?.Slug}`

                    const subject = `${business?.User?.Name}, ${Translation('your-business')} "${businessTitle}" ${Translation('is-approved')} ✅`

                    const onApprovalSubject = await SendEmail({
                        subject,
                        from: `${Translation('app-name')} <${RESEND_FROM_EMAIL}>`,
                        toEmail: business?.User?.Email,
                        template: OnBusinessApproval({
                            subject,
                            userName: business?.User?.Name || '',
                            businessName: businessTitle,
                            businessLink
                        })
                    })

                    if (onApprovalSubject) {
                        business.Mails.OnApprovalMail = true
                        business.Updated_At = CurrentTimestamp()
            
                        await business.save()
                    }
            
                    else Console.Error('ApproveBusiness', 'on_welcome_email_was_not_sent')
                }

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-has-been-approved-successfully',
                    data: null
                })
            }

            else return await HttpResponder({
                c,
                success: false,
                code: 400,
                data: null,
                message: 'business-could-not-be-found-when-handling-business-approval'
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 403,
            data: null,
            message: 'user-is-not-authorized-to-handle-businesses-approvals'
        })
    }

    catch (error) {
        Console.Error('SubmitBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'business-could-not-be-handled-for-approval-for-an-unknown-reason'
        })
    }
}

export default ApproveBusiness