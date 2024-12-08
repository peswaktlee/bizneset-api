import type { HttpResponderFunctionProps, RequestResponseTypes } from '@/ts'

import { version } from '@/package.json'
import { Translation } from '@/helpers/generals'
import { EncodeBody } from '@/helpers/http'
import { ENV, ENVIRONMENTS } from '@/data/constants'

const HttpResponder = async (inital: HttpResponderFunctionProps) => {
    const { 
        c, 
        success, 
        message, 
        data, 
        code, 
        encode = true
    } = inital

    c.status(code)

    const res_data: RequestResponseTypes = {
        success,
        message: Translation(message),
        data,
        code,
        version
    }

    return c.json(encode === false ? res_data : ENV === ENVIRONMENTS.PROD ? EncodeBody(res_data) : res_data)
}

export default HttpResponder