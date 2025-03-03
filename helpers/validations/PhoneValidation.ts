import type { ValidationReturnType } from '@/ts'

import { string } from 'zod'
import { CreateValidationObject, Translation } from '@/helpers/generals'

export const PhoneValidation = (phone: string, skipEmpty: boolean): ValidationReturnType => {
    const validation = CreateValidationObject()

    if (skipEmpty && phone?.trim()?.length === 0) return validation

    else {
        const phoneStringRule = string()
        const maxCase = string().max(20)
        const minCase = string().min(9)
        const includesPlusOnStart = string().regex(/^\+/)

        try {
            phoneStringRule.parse(phone)
        }

        catch (error) {
            validation.message = Translation('phone-number-should-be-valid')
            validation.error = true
        }

        try {
            maxCase.parse(phone)
        }

        catch (error) {
            validation.message = Translation('phone-number-should-be-max')
            validation.error = true
        }

        try {
            minCase.parse(phone)
        }

        catch (error) {
            validation.message = Translation('phone-number-should-be-min')
            validation.error = true
        }

        try {
            includesPlusOnStart.parse(phone)
        }

        catch (error) {
            validation.message = Translation('phone-number-should-include-plus-on-start')
            validation.error = true
        }

        return validation
    }
}

export default PhoneValidation