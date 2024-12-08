import type { CityInterface } from '@/ts'

import { Model, model } from 'mongoose'
import { CityStructure } from '@/data/structures'
import { MODELS } from '@/data/constants'

let CityModel: Model<CityInterface>

try {
    CityModel = model<CityInterface>(MODELS.CITY)
} 

catch {
    CityModel = model<CityInterface>(MODELS.CITY, CityStructure)
}

export default CityModel