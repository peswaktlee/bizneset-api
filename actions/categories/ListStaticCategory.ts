import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CategoryModel } from '@/data/models'

const ListStaticCategory = async (c: Context) => {
    try {
        const { slug, selection } = await DecodeBody(c)

        const category = await CategoryModel
            .findOne({ Slug: slug })
            .select(selection)
            .lean()

        return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'static-category-where-listed-successfully',
            data: category
        })
    }

    catch (error) {
        Console.Error('ListStaticCategory', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-static-category',
            data: null
        })
    }
}

export default ListStaticCategory