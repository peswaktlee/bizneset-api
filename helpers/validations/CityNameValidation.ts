import type { ValidationReturnType } from '@/ts'

import { z } from 'zod'
import { Translation } from '@/helpers/generals'

export const CityNameValidation = (name: string): ValidationReturnType => {
    const cityName = z.string()
    const minLengthCase = cityName.min(2)
    const maxLengthCase = cityName.max(64)

    try {
        cityName.parse(name)
    } 
    
    catch {
        return {
            message: Translation('city-name-should-be-string'),
            error: true
        }
    }

    try {
        minLengthCase.parse(name)
    }

    catch {
        return {
            message: Translation('city-name-min-error'),
            error: true
        }
    }

    try {
        maxLengthCase.parse(name)
    }

    catch {
        return {
            message: Translation('city-name-max-error'),
            error: true
        }
    }

    return {
        message: '',
        error: false
    }
}

export default CityNameValidation