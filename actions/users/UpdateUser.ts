/* eslint-disable no-self-assign */

import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { CurrentTimestamp } from '@/helpers/dates'
import { Console } from '@/helpers/logs'
import { CONTEXT_KEYS } from '@/data/constants'

import {
    UserNameValidation,
    UserSurnameValidation,
    NotificationBooleanValidation
} from '@/helpers/validations'

const UpdateUser = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const { 
                name, 
                surname, 
                onBusinessStatuses
            } = await DecodeBody(c)

            const nameValidation = UserNameValidation(name)
            const surnameValidation = UserSurnameValidation(surname)
            const notificationOnSubmitValidation = NotificationBooleanValidation(onBusinessStatuses)
    
            const isError =
                nameValidation.error ||
                surnameValidation.error ||
                notificationOnSubmitValidation.error

            if (!isError) {
                user.Name = name
                user.Surname = surname
                user.Notifications.OnBusinessStatuses = onBusinessStatuses
                user.Updated_At = CurrentTimestamp()

                await user.save()
    
                return await HttpResponder({
                    c,
                    success: true,
                    message: 'user-was-updated-successfully',
                    data: user,
                    code: 200
                })
            }
    
            else return await HttpResponder({
                c,
                success: false,
                message: 'user-could-not-be-updated-beacuse-the-body-data-is-invalid',
                code: 400,
                data: {
                    name: nameValidation,
                    surname: surnameValidation,
                    onBusinessStatuses: notificationOnSubmitValidation
                }
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            message: 'user-was-not-found-so-user-could-not-be-updated',
            data: null,
            code: 404
        })
    } 
    
    catch (error) {
        Console.Error('UpdateUser', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'user-could-not-be-updated-because-something-went-wrong',
            data: null,
            code: 500
        })
    }
}

export default UpdateUser
