import type { BackupInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { BackupStructure} from '@/data/structures'
import { MODELS } from '@/data/constants'

let BackupModel: Model<BackupInterface>

try {
    BackupModel = model<BackupInterface>(MODELS.BACKUP)
}

catch {
    BackupModel = model<BackupInterface>(MODELS.BACKUP, BackupStructure)
}

export default BackupModel