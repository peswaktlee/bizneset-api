import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { LoginUser, RegisterUser } from '@/helpers/users'
import { CONTEXT_KEYS } from '@/data/constants'

const AuthUser = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (typeof user === 'object') {
            const { avatar } = await DecodeBody(c)
            return await LoginUser(c, user, avatar)
        }

        else if (typeof user === 'string') {
            const uid = user

            const { 
                name,
                email,
                phone,
                avatar
            } = await DecodeBody(c)

            const [firstName, lastName] = name.split(' ')

            return await RegisterUser({
                c, 
                uid,
                name: firstName,
                surname: lastName,
                email,
                phone,
                avatar
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            message: 'user-was-not-authed-because-of-a-problem',
            data: null,
            code: 500
        })
    }

    catch (error) {
        Console.Error('AuthUser', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'user-was-not-authed-because-of-a-problem',
            data: null,
            code: 500
        })
    }
}

export default AuthUser