import type { Context, Next } from 'hono'

import { Console } from '@/helpers/logs'
import { HttpResponder } from '@/helpers/http'
import { HEADER_KEYS, SECRET_KEY } from '@/data/constants'

const KeyMiddleware = async (c: Context, next: Next) => {
    try {
        const authorization = c.req.header(HEADER_KEYS.AUTHORIZATION)

        if (authorization) {
            const isValid = SECRET_KEY === authorization

            if (isValid) return await next()

            else return await HttpResponder({
                c,
                success: false,
                message: 'invalid-authorization-header-token',
                data: null,
                code: 401,
                encode: false
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            message: 'missing-authorization-header-token',
            data: null,
            code: 401,
            encode: false
        })
    } 
    
    catch (error) {
        Console.Error('KeyMiddleware', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'something-went-wrong-while-trying-to-complete-the-authentation',
            data: null,
            code: 500,
            encode: false
        })
    }
}

export default KeyMiddleware