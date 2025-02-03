import type { CityInterface } from '@/ts'

import { Schema } from 'mongoose'
import { MODELS } from '@/data/constants'

const CityStructure: Schema<CityInterface> = new Schema(
    {
        Name: {
            type: String,
            required: true,
            unique: false
        },
        Country: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: MODELS.COUNTRY
        },
        Users: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Posts: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Created_At: {
            type: Date,
            required: true,
            unique: false
        },
        Updated_At: {
            type: Date,
            required: false,
            unique: false,
            default: null
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)

export default CityStructure