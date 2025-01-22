import type { SaveInterface } from '@/ts'

import { Schema } from 'mongoose'
import { MODELS } from '@/data/constants'

const SaveStructure: Schema<SaveInterface> = new Schema(
    {
        User: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: MODELS.USER
        },
        Business: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: MODELS.BUSINESS
        },
        Saved_At: {
            type: Date,
            required: true,
            unique: false
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)

export default SaveStructure