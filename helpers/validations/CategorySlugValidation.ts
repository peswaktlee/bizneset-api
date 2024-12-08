import type { ValidationReturnType } from '@/ts'

import { z } from 'zod'
import { Translation } from '@/helpers/generals'

export const CategorySlugValidation = (slug: string): ValidationReturnType => {
    const categoryName = z.string()
    const minLengthCase = categoryName.min(2)
    const maxLengthCase = categoryName.max(64)

    try {
        categoryName.parse(slug)
    } 
    
    catch {
        return {
            message: Translation('category-slug-should-be-string'),
            error: true
        }
    }

    try {
        minLengthCase.parse(slug)
    }

    catch {
        return {
            message: Translation('category-slug-min-error'),
            error: true
        }
    }

    try {
        maxLengthCase.parse(slug)
    }

    catch {
        return {
            message: Translation('category-slug-max-error'),
            error: true
        }
    }

    return {
        message: '',
        error: false
    }
}

export default CategorySlugValidation