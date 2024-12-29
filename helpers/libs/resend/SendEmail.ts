import type { SendEmailFunctionProps } from '@/ts'

import { Resend } from '@/helpers/libs/resend'
import { Console } from '@/helpers/logs'

const SendEmail = async (props: SendEmailFunctionProps): Promise<string | null> => {
    try {
        const { 
            subject, 
            from,
            template, 
            toEmail, 
            toEmails 
        } = props

        const to: string | string[] = toEmail ? [toEmail] : toEmails || []

        const results = await Resend.emails.send({
            from: from ? from : '',
            to,
            subject,
            react: template
        })

        return results?.data?.id || null
    }

    catch (error) {
        Console.Error('SendEmail', error)
        return null
    }
}

export default SendEmail