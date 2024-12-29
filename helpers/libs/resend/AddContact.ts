import type { UserInterface } from '@/ts'

import { Resend } from '@/helpers/libs/resend'
import { Console } from '@/helpers/logs'
import { RESEND_GENERAL_AUDIENCE_ID } from '@/data/constants'

const AddContact = async (user: UserInterface): Promise<string | null> => {
    try {
        const name = user?.Name || ''
        const surname = user?.Surname || ''

        let nameFormatted = name?.trim().charAt(0).toUpperCase() + name?.trim().slice(1)
        let surnameFormatted = surname?.trim().charAt(0).toUpperCase() + surname?.trim().slice(1)

        const result = await Resend.contacts.create({
            email: user?.Email,
            firstName: nameFormatted,
            lastName: surnameFormatted,
            unsubscribed: false,
            audienceId: RESEND_GENERAL_AUDIENCE_ID
        })

        return result?.data?.id || null
    }

    catch (error) {
        Console.Error('AddContact', error)
        return null
    }
}

export default AddContact