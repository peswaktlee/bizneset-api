import type { Context, Next } from 'hono'

import { Console } from '@/helpers/logs'
import { HttpResponder } from '@/helpers/http'
import { UserModel } from '@/data/models'
import { Firebase } from '@/helpers/libs/firebase'
import { CONTEXT_KEYS, HEADER_KEYS, USER_ROLES } from '@/data/constants'

const AuthMiddleware = async (c: Context, next: Next) => {
    const admin = await Firebase()
    const authorization = c.req.header(HEADER_KEYS.AUTHORIZATION)

    try {
        if (!authorization) return await HttpResponder({
            c,
            success: false,
            message: 'the-user-token-is-missing',
            data: null,
            code: 500
        })

        else {
            const token = authorization.replace('Bearer ', '')
            const decodedToken = await admin.auth().verifyIdToken(token)

            if (decodedToken?.uid) {
                const user = await UserModel.findOne({ Uid: decodedToken.uid })

                if (user) {
                    c.set(CONTEXT_KEYS.USER, user)
                    
                    if (user?.Role === USER_ROLES.ADMIN) c.set(CONTEXT_KEYS.ADMIN, user)

                    await next()
                }

                else return await HttpResponder({
                    c,
                    success: false,
                    message: 'the-user-token-is-modified-or-invalid',
                    data: null,
                    code: 500
                })
            }

            else return await HttpResponder({
                c,
                success: false,
                message: 'the-user-token-is-modified-or-invalid',
                data: null,
                code: 500
            })
        }
    }

    catch (error) {
        Console.Error('AuthMiddleware', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'something-went-wrong-while-trying-to-verify-the-user',
            data: null,
            code: 500
        })
    }
}

export default AuthMiddleware