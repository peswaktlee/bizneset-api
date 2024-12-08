import type { Context } from 'hono'

import { UserModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { LoginUser, RegisterUser } from '@/helpers/users'
import { AUTH_USER_SELECTOR, CONTEXT_KEYS } from '@/data/constants'

const AuthUser = async (c: Context) => {
    try {
        const uid = c.get(CONTEXT_KEYS.UID)
        
        const { 
            name,
            email,
            avatar
        } = await DecodeBody(c)

        const user = await UserModel
            .findOne({ Uid: uid })
            .select(AUTH_USER_SELECTOR)
            .lean()

        if (user) return await LoginUser(
            c, 
            user, 
            uid
        )

        else return await RegisterUser(
            c, 
            uid,
            name,
            email,
            avatar
        )
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