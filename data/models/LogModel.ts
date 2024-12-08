import type { LogInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { LogStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let LogModel: Model<LogInterface>

try {
    LogModel = model<LogInterface>(MODELS.LOG)
} 

catch {
    LogModel = model<LogInterface>(MODELS.LOG, LogStructure)
}

export default LogModel