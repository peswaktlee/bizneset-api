import type { ValidationReturnType } from '@/ts'
import { Translation } from '@/helpers/generals'

export const CityValidation = (city: string | null, cities: Array<string>): ValidationReturnType => {
    if (!city) return {
        message: Translation('city-selection-error'),
        error: true
    }

    if (!cities.includes(city)) return {
        message: Translation('city-selection-error'),
        error: true
    }

    return {
        message: '',
        error: false
    }
}

export default CityValidation