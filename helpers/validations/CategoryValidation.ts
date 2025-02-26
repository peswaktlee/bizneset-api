import type { ValidationReturnType } from '@/ts'

import { CreateValidationObject, Translation } from '@/helpers/generals'
import { GetCategories } from '@/helpers/entities'

export const CategoryValidation = async (category: string | null): Promise<ValidationReturnType> => {
    const categories = await GetCategories()

    const validation = CreateValidationObject()
    const categoriesId = categories?.map(category => category?._id)

    if (!category) {
        validation.message = Translation('category-post-selection-error'),
        validation.error = true
    }

    else if (!categoriesId.includes(category)) {
        validation.message = Translation('category-post-selection-error')
        validation.error = true
    }

    return validation
}

export default CategoryValidation