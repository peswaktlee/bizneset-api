import type { Context } from 'hono'

import { HttpResponder } from '@/helpers/http'

const CatchAll = async (c: Context) => await HttpResponder({
    c,
    success: false,
    message: 'route-was-not-found',
    data: null,
    code: 404,
    encode: false
})

export default CatchAll