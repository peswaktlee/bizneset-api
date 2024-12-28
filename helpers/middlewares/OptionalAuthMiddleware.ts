import type { Context, Next } from 'hono'

import { Console } from '@/helpers/logs'
import { Firebase } from '@/helpers/libs/firebase'
import { UserModel } from '@/data/models'
import { CONTEXT_KEYS, HEADER_KEYS } from '@/data/constants'

const OptionalAuthMiddleware = async (c: Context, next: Next) => {
    const admin = await Firebase()
    const authorization = c.req.header(HEADER_KEYS.AUTHORIZATION)

    try {
        if (authorization) {
            const token = authorization.replace('Bearer ', '')
            const decodedToken = await admin.auth().verifyIdToken(token)

            if (decodedToken?.uid) {
                const user = await UserModel
                    .findOne({ Uid: decodedToken?.uid })
                    .lean()

                if (user) c.set(CONTEXT_KEYS.USER, user)
                else c.set(CONTEXT_KEYS.USER, decodedToken?.uid)
            }

            else c.set(CONTEXT_KEYS.USER, null)
        }
    }

    catch (error) {
        Console.Error('OptionalApiAuth', error)
    }

    finally {
        await next()
    }
}

export default OptionalAuthMiddleware