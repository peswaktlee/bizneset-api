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
        Category: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: false,
            ref: MODELS.CATEGORY
        },
        Status: {
            type: String,
            required: true,
            unique: false,
            default: BUSINESS_STATUSES.PENDING
        },
        RejectionNote: {
            type: String,
            required: false,
            unique: false,
            default: ''
        },
        Logo: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Gallery: {
            type: [Object],
            required: false,
            unique: false,
            default: []
        },
        Description: {
            type: String,
            required: true,
            unique: false,
            default: ''
        },
        Locations: {
            type: [Object],
            required: false,
            unique: false,
            default: []
        },
        LocationCount: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Links: {
            type: [Object],
            required: false,
            unique: false,
            default: []
        },
        LinkCount: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Website: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Email: {
            type: String,
            required: false,
            unique: false,
            default: null
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
        Mails: {
            OnApprovalMail: {
                type: Boolean,
                required: false,
                unique: false,
                default: false
            },
            OnRejectionMail: {
                type: Boolean,
                required: false,
                unique: false,
                default: false
            },
            OnKViewsMail: {
                type: Boolean,
                required: false,
                unique: false,
                default: false
            },
            OnKKViewsMail: {
                type: Boolean,
                required: false,
                unique: false,
                default: false
            },
            OnKKKViewsMail: {
                type: Boolean,
                required: false,
                unique: false,
                default: false
            },
            OnKKKKViewsMail: {
                type: Boolean,
                required: false,
                unique: false,
                default: false
            }
        },
        Created_At: {
            type: Date,
            required: true,
            unique: false
        },
        Delete_At: {
            type: Date,
            required: false,
            unique: false,
            default: null
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