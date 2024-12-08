import type { ValidationReturnType } from '@/ts'

import { z } from 'zod'
import { Translation } from '@/helpers/generals'

export const CountryCodeValidation = (code: number): ValidationReturnType => {
    const cityName = z.string()
    const lengthCase = cityName.min(2)

    try {
        cityName.parse(code)
    } 
    
    catch {
        return {
            message: Translation('country-code-should-be-string'),
            error: true
        }
    }

    try {
        lengthCase.parse(code)
    }

    catch {
        return {
            message: Translation('country-code-should-be-at-2-characters'),
            error: true
        }
    }

    return {
        message: '',
        error: false
    }
}

export default CountryCodeValidation