import type { CategoryInterface } from '@/ts'
import { Schema } from 'mongoose'

const CategoryStructure: Schema<CategoryInterface> = new Schema(
    {
        Name: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Slug: {
            type: String,
            required: false,
            unique: false,
            default: null
        },
        Businesses: {
            type: Number,
            required: false,
            unique: false,
            default: 0
        },
        Created_At: {
            type: Date,
            required: false,
            unique: false
        },
        Updated_At: {
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

export default CategoryStructure