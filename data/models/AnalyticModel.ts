import type { AnalyticInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { AnalyticStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let AnalyticModel: Model<AnalyticInterface>

try {
    AnalyticModel = model<AnalyticInterface>(MODELS.ANALYTIC)
}

catch {
    AnalyticModel = model<AnalyticInterface>(MODELS.ANALYTIC, AnalyticStructure)
}

export default AnalyticModel