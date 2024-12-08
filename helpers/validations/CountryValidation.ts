import type { ValidationReturnType } from '@/ts'
import { Translation } from '@/helpers/generals'

export const CountryValidation = (country: string, countries: Array<string>): ValidationReturnType => {
    if (!country) return {
        message: Translation('country-post-selection-error'),
        error: true
    }

    if (!countries.includes(country)) return {
        message: Translation('country-post-selection-error'),
        error: true
    }

    return {
        message: '',
        error: false
    }
}

export default CountryValidation