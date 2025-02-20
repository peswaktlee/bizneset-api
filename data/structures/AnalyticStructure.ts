import type { AnalyticInterface } from '@/ts'
import { Schema } from 'mongoose'

const AnalyticStructure: Schema<AnalyticInterface> = new Schema(
    {
        TotalUsers: {
            type: Number,
            required: true,
            unique: false,
            default: 0
        },
        TotalBusinesses: {
            type: Number,
            required: true,
            unique: false,
            default: 0
        },
        TotalBusinessesViews: {
            type: Number,
            required: true,
            unique: false,
            default: 0
        },
        TotalBusinessesReach: {
            type: Number,
            required: true,
            unique: false,
            default: 0
        },
        TotalUserVisits: {
            type: Number,
            required: true,
            unique: false,
            default: 0
        },
        TotalBusinessSaves: {
            type: Number,
            required: true,
            unique: false,
            default: 0
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

export default AnalyticStructure