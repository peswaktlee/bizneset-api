import type { CategoryInterface } from '@/ts'

import { CategoryModel } from '@/data/models'
import { CategoryListSelector } from '@/data/constants'
import { STATES, ENV, ENVIRONMENTS } from '@/data/constants'

const GetCategories = async (): Promise<Array<CategoryInterface>> => {
    if (ENV === ENVIRONMENTS.PROD) {
        if (STATES.CATEGORIES) return STATES.CATEGORIES
        
        else {
            const countries = await CategoryModel.find()
                .select(CategoryListSelector)
                .sort({ Name: 1 })
                .lean()

            STATES.CATEGORIES = countries

            return countries
        }
    } 
    
    else {
        const countries = await CategoryModel.find()
            .select(CategoryListSelector)
            .sort({ Name: 1 })
            .lean()

        return countries
    }
}

export default GetCategories