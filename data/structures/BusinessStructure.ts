import type { BusinessInterface } from '@/ts'

import { Schema } from 'mongoose'
import { MODELS } from '@/data/constants'

const BusinessStructure: Schema<BusinessInterface> = new Schema(
    {
        User: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: MODELS.USER
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)

export default BusinessStructure