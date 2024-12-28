import type { UserInterface } from '@/ts'

import { Schema } from 'mongoose'
import { MODELS, USER_ROLES } from '@/data/constants'

const UserStructure: Schema<UserInterface> = new Schema(
    {
        Uid: {
            type: String,
            required: true,
            unique: true
        },
        Name: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Surname: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Phone: {
            type: Number,
            required: false,
            unique: true,
            default: null
        },
        Avatar: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Role: {
            type: String,
            required: false,
            unique: false,
            default: USER_ROLES.USER
        },
        Visits: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Businesses: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Country: {
            type: Schema.Types.ObjectId,
            required: false,
            unique: false,
            ref: MODELS.COUNTRY,
            default: null
        },
        City: {
            type: Schema.Types.ObjectId,
            required: false,
            unique: false,
            ref: MODELS.CITY,
            default: null
        },
        Last_Active_At: {
            type: Date,
            required: true,
            unique: false
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

export default UserStructure