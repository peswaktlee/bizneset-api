import type { BusinessInterface } from '@/ts'

import { Translation } from '@/helpers/generals'
import { SendEmail } from '@/helpers/libs/resend'
import { OnBusinessViews } from '@/ui/templates'
import { Console } from '@/helpers/logs'
import { BusinessModel, UserModel } from '@/data/models'
import { FormatBusinessTitle } from '@/helpers/businesses'
import { CurrentTimestamp } from '@/helpers/dates'

import { 
    FULL_APP_HOST, 
    RESEND_FROM_EMAIL, 
    VIEWS_FOR_EMAIL, 
    VIEWS_WITH_COMMA_EMAIL 
} from '@/data/constants'

const CalculateViewsForEmail = async (views: number, userId: string, business: BusinessInterface) => {
    try {
        let shouldSend = false

        const isK = views === VIEWS_FOR_EMAIL.K && !business?.Mails?.OnKViewsMail
        const isKK = views === VIEWS_FOR_EMAIL.KK && !business?.Mails?.OnKKViewsMail
        const isKKK = views === VIEWS_FOR_EMAIL.KKK && !business?.Mails?.OnKKKViewsMail
        const isKKKK = views === VIEWS_FOR_EMAIL.KKKK && !business?.Mails?.OnKKKKViewsMail

        if (isK) shouldSend = true
        else if (isKK) shouldSend = true
        else if (isKKK) shouldSend = true
        else if (isKKKK) shouldSend = true

        if (shouldSend) {
            const user = await UserModel
                .findById(userId)
                .lean()

            if (user && user?.Email && user?.Name) {
                const businessTitle = FormatBusinessTitle(business?.Title)
                const businessLink = `${FULL_APP_HOST}/${business?.Slug}`

                let subject = `${user?.Name}, ${Translation('your-business')} "${businessTitle}" ${Translation('has-reached')}`

                if (isK) {
                    subject = subject + ` ${VIEWS_WITH_COMMA_EMAIL.K} ${Translation('visits')} 👀🎉`
        
                    const isKstatus = await SendEmail({
                        subject,
                        from: `${Translation('app-name')} <${RESEND_FROM_EMAIL}>`,
                        toEmail: user?.Email,
                        template: OnBusinessViews({
                            subject,
                            views: VIEWS_WITH_COMMA_EMAIL.K,
                            userName: user?.Name,
                            businessName: businessTitle,
                            businessLink
                        })
                    })

                    if (isKstatus) await BusinessModel.updateOne({ _id: business?._id }, {
                        'Mails.OnKViewsMail': true,
                        'Updated_At': CurrentTimestamp()
                    })

                    else Console.Error('CalculateViewsForEmail', 'isKstatus_error')
                }
        
                else if (isKK) {
                    subject = subject + ` ${VIEWS_WITH_COMMA_EMAIL.KK} ${Translation('visits')} 👀🎉`
        
                    const isKKstatus = await SendEmail({
                        subject,
                        from: `${Translation('app-name')} <${RESEND_FROM_EMAIL}>`,
                        toEmail: user?.Email,
                        template: OnBusinessViews({
                            subject,
                            views: VIEWS_WITH_COMMA_EMAIL.KK,
                            userName: user?.Name,
                            businessName: businessTitle,
                            businessLink
                        })
                    })

                    if (isKKstatus) await BusinessModel.updateOne({ _id: business?._id }, {
                        'Mails.OnKKViewsMail': true,
                        'Updated_At': CurrentTimestamp()
                    })

                    else Console.Error('CalculateViewsForEmail', 'isKKstatus_error')
                }
        
                else if (isKKK) {
                    subject = subject + ` ${VIEWS_WITH_COMMA_EMAIL.KKK} ${Translation('visits')} 👀🎉`
        
                    const isKKKstatus = await SendEmail({
                        subject,
                        from: `${Translation('app-name')} <${RESEND_FROM_EMAIL}>`,
                        toEmail: user?.Email,
                        template: OnBusinessViews({
                            subject,
                            views: VIEWS_WITH_COMMA_EMAIL.KKK,
                            userName: user?.Name,
                            businessName: businessTitle,
                            businessLink
                        })
                    })

                    if (isKKKstatus) await BusinessModel.updateOne({ _id: business?._id }, {
                        'Mails.OnKKKViewsMail': true,
                        'Updated_At': CurrentTimestamp()
                    })

                    else Console.Error('CalculateViewsForEmail', 'isKKKstatus_error')
                }
        
                else if (isKKKK) {
                    subject = subject + ` ${VIEWS_WITH_COMMA_EMAIL.KKKK} ${Translation('visits')} 👀🎉`
        
                    const isKKKKstatus = await SendEmail({
                        subject,
                        from: `${Translation('app-name')} <${RESEND_FROM_EMAIL}>`,
                        toEmail: user?.Email,
                        template: OnBusinessViews({
                            subject,
                            views: VIEWS_WITH_COMMA_EMAIL.KKKK,
                            userName: user?.Name,
                            businessName: businessTitle,
                            businessLink
                        })
                    })

                    if (isKKKKstatus) await BusinessModel.updateOne({ _id: business?._id }, {
                        'Mails.OnKKKKViewsMail': true,
                        'Updated_At': CurrentTimestamp()
                    })

                    else Console.Error('CalculateViewsForEmail', 'isKKKKstatus_error')
                }
            }
            
            else Console.Error('CalculateViewsForEmail', 'usr_not_found')
        } 
    }

    catch (error) {
        Console.Error('CalculateViewsForEmail', error)
    }
}

export default CalculateViewsForEmail