import type { ValidationReturnType } from '@/ts'

import { string } from 'zod'
import { CreateValidationObject, Translation } from '@/helpers/generals'

export const WebsiteValidation = (link: string, skipEmpty: boolean): ValidationReturnType => {
    const validation = CreateValidationObject()

    if (skipEmpty && link?.trim()?.length === 0) return validation

    else {
        const websiteSchemaRule = string().regex(/^(http:\/\/|https:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+.*$/)

        try {
            websiteSchemaRule.parse(link)
        }

        catch (error) {
            validation.message = Translation('link-validation-error')
            validation.error = true
        }

        return validation
    }
}

export default WebsiteValidation