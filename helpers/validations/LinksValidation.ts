import type { BusinessLinkInterface, ValidationReturnType } from '@/ts'

import { WebsiteValidation } from '@/helpers/validations'
import { CreateValidationObject, Translation } from '@/helpers/generals'

const LinksValidation = (linksUnformatted: Array<BusinessLinkInterface>): ValidationReturnType => {
    let errors = []

    const links = linksUnformatted.map(link => link?.Link)
    const validation = CreateValidationObject()

    links.forEach((link: string) => {
        const { error } = WebsiteValidation(link, false)

        if (error) errors.push(link)
    })

    if (errors.length > 0) {
        validation.error = true
        validation.message = Translation('links-validation-error')
    }

    return validation
}

export default LinksValidation