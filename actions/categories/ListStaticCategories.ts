import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CategoryModel } from '@/data/models'

const ListStaticCategories = async (c: Context) => {
    try {
        const { selection } = await DecodeBody(c)

        const categories = await CategoryModel
            .find({})
            .select(selection)
            .lean()

        return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'static-categories-where-listed-successfully',
            data: categories
        })
    }

    catch (error) {
        Console.Error('ListStaticCategories', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-static-categories',
            data: null
        })
    }
}

export default ListStaticCategories