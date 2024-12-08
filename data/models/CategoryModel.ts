import type { CategoryInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { CategoryStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let CategoryModel: Model<CategoryInterface>

try {
    CategoryModel = model<CategoryInterface>(MODELS.CATEGORY)
} 

catch {
    CategoryModel = model<CategoryInterface>(MODELS.CATEGORY, CategoryStructure)
}

export default CategoryModel