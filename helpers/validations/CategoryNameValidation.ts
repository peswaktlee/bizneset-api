import type { ValidationReturnType } from '@/ts'

import { z } from 'zod'
import { Translation } from '@/helpers/generals'

export const CategoryNameValidation = (name: string): ValidationReturnType => {
    const categoryName = z.string()
    const minLengthCase = categoryName.min(2)
    const maxLengthCase = categoryName.max(64)

    try {
        categoryName.parse(name)
    } 
    
    catch {
        return {
            message: Translation('category-name-should-be-string'),
            error: true
        }
    }

    try {
        minLengthCase.parse(name)
    }

    catch {
        return {
            message: Translation('category-name-min-error'),
            error: true
        }
    }

    try {
        maxLengthCase.parse(name)
    }

    catch {
        return {
            message: Translation('category-name-max-error'),
            error: true
        }
    }

    return {
        message: '',
        error: false
    }
}

export default CategoryNameValidation