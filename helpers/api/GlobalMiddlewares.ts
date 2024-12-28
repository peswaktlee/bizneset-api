import type { RequestOptions } from '@/ts'
import type { Context } from 'hono'
import type { HonoBase } from 'hono/hono-base'

import { Next } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { HttpResponder } from '@/helpers/http'
import { ApiVersion, ApiLanguage } from '@/helpers/middlewares'

const ApiOptions = async (c: Context, next: Next) => {
    const OPTIONS: RequestOptions = {
        Language: null,
        Version: null
    }

    const api_version = ApiVersion(c)

    if (api_version === null) return await HttpResponder({
        c,
        success: false,
        message: 'invalid-api-version',
        data: null,
        code: 400,
        encode: false
    })

    const api_language = ApiLanguage(c)

    if (api_language === null) return await HttpResponder({
        c,
        success: false,
        message: 'invalid-api-language',
        data: null,
        code: 400,
        encode: false
    })

    
    else {
        OPTIONS.Language = api_language
        OPTIONS.Version = api_version

        await next()
    }
}

const GlobalMiddlewares = async (route: string, api: HonoBase) => {
    api.use(`${route}/*`, etag())
    api.use(`${route}/*`, logger())

    api.use(`${route}/*`, ApiOptions)
}

export default GlobalMiddlewares