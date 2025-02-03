import type { BackupInterface } from '@/ts'
import { Schema } from 'mongoose'

const BackupStructure: Schema<BackupInterface> = new Schema(
    {
        Items: {
            type: Number,
            required: true,
            unique: false
        },
        Paths: [{
            type: String,
            required: false,
            unique: false
        }],
        Entities: {
            type: Number,
            required: true,
            unique: false
        },
        Size: {
            type: Number,
            required: true,
            unique: false
        },
        Time: {
            type: Number,
            required: true,
            unique: false
        },
        Started_Generation_At: {
            type: Date,
            required: true,
            unique: false
        },
        Finished_Generation_At: {
            type: Date,
            required: false,
            unique: false
        }
    },
    {
        timestamps: false,
        versionKey: false
    }
)

export default BackupStructure