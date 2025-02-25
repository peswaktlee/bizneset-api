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
        Email: {
            type: String,
            required: true,
            unique: true
        },
        Phone: {
            type: Number,
            required: false,
            unique: false,
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
        DeletedBusinesses: {
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
        HasPendingBusinessSubmission: {
            type: Boolean,
            required: false,
            unique: false,
            default: false
        },
        Notifications: {
            GeneralUpdates: {
                type: Boolean,
                required: false,
                unique: false,
                default: true
            },
            OnBusinessStatuses: {
                type: Boolean,
                required: false,
                unique: false,
                default: true
            }
        },
        Mails: {
            OnWelcome: {
                type: Boolean,
                required: false,
                unique: false,
                default: true
            }
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
        },
        Last_Avatar_Update_At: {
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

export default UserStructure