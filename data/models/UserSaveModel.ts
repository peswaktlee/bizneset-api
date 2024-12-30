import type { UserSaveInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { UserSaveStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let UserSaveModel: Model<UserSaveInterface>

try {
    UserSaveModel = model<UserSaveInterface>(MODELS.USER)
} 

catch {
    UserSaveModel = model<UserSaveInterface>(MODELS.USER_SAVE, UserSaveStructure)
}

export default UserSaveModel