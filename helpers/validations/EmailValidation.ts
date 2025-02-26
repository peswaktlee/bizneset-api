import type { ValidationReturnType } from '@/ts'

import { string } from 'zod'
import { CreateValidationObject, Translation } from '@/helpers/generals'

export const EmailValidation = (email: string, skipEmpty: boolean): ValidationReturnType => {
    const validation = CreateValidationObject()
    
    if (skipEmpty && email?.trim()?.length === 0) return validation

    else {
        const emailSchemaRule = string().email()

        try {
            emailSchemaRule.parse(email)
        }

        catch (error) {
            validation.message = Translation('email-validation-error')
            validation.error = true
        }

        return validation
    }
}

export default EmailValidation