
import {
    HOST,
    GROUP_ROUTES,
    LOG_TYPES,
    API_VERSIONS,
    LANGUAGES,
    LOGS_ROUTES
} from '@/data/constants'

const URL = `${HOST}/${GROUP_ROUTES.LOGS}${LOGS_ROUTES.CREATE_LOG}`

const HEADERS = {
    'Content-Type': 'application/json',
    'Api-Version': API_VERSIONS.V1,
    'Api-Language': LANGUAGES.ALBANIAN
}

const OnInfoConsole = async (func: string, message: unknown) => {
    try {
        console.info(message)

        const stringified =
            typeof message !== 'string'
                ? JSON.stringify(message, Object.getOwnPropertyNames(message))
                : message.toString()

        const path = typeof window !== 'undefined' ? window?.location?.pathname : null

        await fetch(URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                message: stringified,
                func,
                path,
                type: LOG_TYPES.INFO
            })
        })
    } 
    
    catch (error) {
        console.error('OnInfoConsole', error)
    }
}

const OnWarningConsole = async (func: string, message: unknown) => {
    try {
        console.warn(message)

        const stringified =
            typeof message !== 'string'
                ? JSON.stringify(message, Object.getOwnPropertyNames(message))
                : message.toString()

        const path = typeof window !== 'undefined' ? window?.location?.pathname : null

        await fetch(URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                message: stringified,
                func,
                path,
                type: LOG_TYPES.WARNING
            })
        })
    } 
    
    catch (error) {
        console.error('OnWarningConsole', error)
    }
}

const OnErrorConsole = async (func: string, message: unknown) => {
    const stringified =
        typeof message !== 'string'
            ? JSON.stringify(message, Object.getOwnPropertyNames(message))
            : message.toString()

    try {
        console.error(message)

        const path = typeof window !== 'undefined' ? window?.location?.pathname : null

        await fetch(URL, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({
                message: stringified,
                func,
                path,
                type: LOG_TYPES.ERROR
            })
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