import type { ValidationReturnType } from '@/ts'

import { z } from 'zod'
import { Translation } from '@/helpers/generals'

export const CountryNameValidation = (name: string): ValidationReturnType => {
    const countryName = z.string()
    const minLengthCase = countryName.min(2)
    const maxLengthCase = countryName.max(64)

    try {
        countryName.parse(name)
    } 
    
    catch {
        return {
            message: Translation('country-name-should-be-string'),
            error: true
        }
    }

    try {
        minLengthCase.parse(name)
    }

    catch {
        return {
            message: Translation('country-name-min-error'),
            error: true
        }
    }

    try {
        maxLengthCase.parse(name)
    }

    catch {
        return {
            message: Translation('country-name-max-error'),
            error: true
        }
    }

    return {
        message: '',
        error: false
    }
}

export default CountryNameValidation