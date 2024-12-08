import type { LogInterface } from '@/ts'

import { Schema } from 'mongoose'
import { MODELS } from '@/data/constants'

const LogStructure: Schema<LogInterface> = new Schema(
    {
        Func: {
            type: String,
            required: true,
            unique: false
        },
        User: {
            type: Schema.Types.ObjectId,
            required: false,
            unique: false,
            ref: MODELS.USER,
            default: null
        },
        Type: {
            type: String,
            required: true,
            unique: false
        },
        Message: {
            type: String,
            required: false,
            unique: false,
            default: ''
        },
        Path: {
            type: String,
            required: false,
            unique: false
        },
        IsServer: {
            type: Boolean,
            required: false,
            unique: false
        },
        Occurred_At: {
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

export default LogStructure