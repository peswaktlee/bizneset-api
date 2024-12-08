import type { BusinessInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { BusinessStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let BusinessModel: Model<BusinessInterface>

try {
    BusinessModel = model<BusinessInterface>(MODELS.BUSINESS)
} 

catch {
    BusinessModel = model<BusinessInterface>(MODELS.BUSINESS, BusinessStructure)
}

export default BusinessModel