import { EncodeRequest } from '@/helpers/http'

import { 
    CONSOLE_LOG_HEADERS, 
    CONSOLE_LOG_URL, 
    ENV, 
    ENVIRONMENTS, 
    LOG_TYPES, 
    METHODS 
} from '@/data/constants'

const OnInfoConsole = async (func: string, message: unknown) => {
    try {
        console.info(message)

        const stringified = typeof message !== 'string' ? JSON.stringify(message, Object.getOwnPropertyNames(message))     : message.toString()
        const path = typeof window !== 'undefined' ? window?.location?.pathname : null

        const parts = {
            message: stringified,
            func,
            path,
            type: LOG_TYPES.INFO
        }

        const body = JSON.stringify(ENV === ENVIRONMENTS.PROD ? EncodeRequest(parts) : parts)

        await fetch(CONSOLE_LOG_URL, {
            method: METHODS.POST,
            headers: CONSOLE_LOG_HEADERS,
            body
        })
    } 
    
    catch (error) {
        console.error('OnInfoConsole', error)
    }
}

const OnWarningConsole = async (func: string, message: unknown) => {
    try {
        console.warn(message)

        const stringified = typeof message !== 'string' ? JSON.stringify(message, Object.getOwnPropertyNames(message))     : message.toString()
        const path = typeof window !== 'undefined' ? window?.location?.pathname : null

        const parts = {
            message: stringified,
            func,
            path,
            type: LOG_TYPES.WARNING
        }

        const body = JSON.stringify(ENV === ENVIRONMENTS.PROD ? EncodeRequest(parts) : parts)

        await fetch(CONSOLE_LOG_URL, {
            method: METHODS.POST,
            headers: CONSOLE_LOG_HEADERS,
            body
        })
    } 
    
    catch (error) {
        console.error('OnWarningConsole', error)
    }
}

const OnErrorConsole = async (func: string, message: unknown) => {
    try {
        console.error(message)

        const stringified = typeof message !== 'string' ? JSON.stringify(message, Object.getOwnPropertyNames(message))     : message.toString()
        const path = typeof window !== 'undefined' ? window?.location?.pathname : null

        const parts = {
            message: stringified,
            func,
            path,
            type: LOG_TYPES.ERROR
        }

        const body = JSON.stringify(ENV === ENVIRONMENTS.PROD ? EncodeRequest(parts) : parts)

        await fetch(CONSOLE_LOG_URL, {
            method: METHODS.POST,
            headers: CONSOLE_LOG_HEADERS,
            body
        })
    } 
    
    catch (error) {
        console.error('OnErrorConsole', error)
    }
}

const Console = {
    Error: (func: string, message: unknown) => OnErrorConsole(func, message),
    Info: (func: string, message: unknown) => OnInfoConsole(func, message),
    Warning: (func: string, message: unknown) => OnWarningConsole(func, message)
}

export default Console