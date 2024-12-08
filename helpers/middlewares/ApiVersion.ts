import type { Context } from 'hono'
import type { ApiVersionsTypes } from '@/ts'

import { ApiVersionsList, HEADER_KEYS } from '@/data/constants'

const ApiVersion = (c: Context): ApiVersionsTypes | null => {
    const api_version = c.req.header(HEADER_KEYS.VERSION)
    const version = ApiVersionsList.find((v) => v.version === api_version)

    if (version) return version.version
    else return null
}

export default ApiVersion