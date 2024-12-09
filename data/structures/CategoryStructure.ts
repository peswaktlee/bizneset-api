import type { CategoryInterface } from '@/ts'
import { Schema } from 'mongoose'

const CategoryStructure: Schema<CategoryInterface> = new Schema(
    {
        Name: {
            type: String,
            required: true,
            unique: true
        },
        Slug: {
            type: String,
            required: true,
            unique: true
        },
        Businesses: {
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

export default CategoryStructure