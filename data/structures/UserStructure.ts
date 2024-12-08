import type { UserInterface } from '@/ts'

import { Schema } from 'mongoose'
import { MODELS } from '@/data/constants'

const UserStructure: Schema<UserInterface> = new Schema(
    {
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
            required: true,
            unique: true
        },
        Avatar: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        ProfileCompleted: {
            type: Boolean,
            required: false,
            unique: false,
            default: false
        },
        CompletedRegistration: {
            type: Boolean,
            required: false,
            unique: false,
            default: false
        },
        Admin: {
            type: Boolean,
            required: false,
            unique: false,
            default: false
        },
        Visits: {
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
        NotificationsSameCity: {
            type: Boolean,
            required: false,
            unique: false,
            default: true
        },
        NotificationsOutsideCity: {
            type: Boolean,
            required: false,
            unique: false,
            default: false
        },
        Last_Active: {
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