import type { ValidationReturnType } from '@/ts'
import { CreateValidationObject, Translation } from '@/helpers/generals'

export const LogoValidation = (logo: File | unknown): ValidationReturnType => {
    const validation = CreateValidationObject()

    try {
        const isFile = logo instanceof File
        
        if (!isFile) {
            validation.message = Translation('logo-error')
            validation.error = true
        }
    }

    catch (_) {
        validation.message = Translation('logo-error')
        validation.error = true
    }

    return validation
}

export default LogoValidation