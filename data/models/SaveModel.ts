import type { SaveInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { SaveStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let SaveModel: Model<SaveInterface>

try {
    SaveModel = model<SaveInterface>(MODELS.USER)
} 

catch {
    SaveModel = model<SaveInterface>(MODELS.USER_SAVE, SaveStructure)
}

export default SaveModel