import type { BusinessInterface } from '@/ts'

import { Schema } from 'mongoose'
import { BUSINESS_STATUSES, MODELS } from '@/data/constants'

const BusinessStructure: Schema<BusinessInterface> = new Schema(
    {
        Title: {
            type: String,
            required: true,
            unique: true
        },
        Slug: {
            type: String,
            required: true,
            unique: true
        },
        User: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: MODELS.USER
        },
        Status: {
            type: String,
            required: true,
            unique: false,
            default: BUSINESS_STATUSES.PENDING
        },
        Description: {
            type: String,
            required: true,
            unique: false
        },
        Locations: {
            type: [Object],
            required: false,
            unique: false,
            default: []
        },
        Links: {
            type: [String],
            required: false,
            unique: false,
            default: []
        },
        Visits: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Reach: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Saves: {
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

export default BusinessStructure