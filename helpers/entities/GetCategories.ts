import type { CategoryInterface } from '@/ts'

import { CategoryModel } from '@/data/models'
import { CategoryListSelector } from '@/data/constants'
import { STATES, ENV, ENVIRONMENTS } from '@/data/constants'

const GetCategories = async (): Promise<Array<CategoryInterface>> => {
    if (ENV === ENVIRONMENTS.PROD) {
        if (STATES.CATEGORIES) return STATES.CATEGORIES
        
        else {
            const categories = await CategoryModel.find()
                .select(CategoryListSelector)
                .sort({ Position: 1 })
                .lean()

            STATES.CATEGORIES = categories

            return categories
        }
    } 
    
    else {
        const categories = await CategoryModel.find()
            .select(CategoryListSelector)
            .sort({ Position: 1 })
            .lean()

        return categories
    }
}

export default GetCategories