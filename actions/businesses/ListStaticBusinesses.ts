import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'

const ListStaticBusinesses = async (c: Context) => {
    try {
        const { selection } = await DecodeBody(c)

        const businesses = await BusinessModel
            .find({})
            .select(selection)
            .lean()

        return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'static-businesses-where-listed-successfully',
            data: businesses
        })
    }

    catch (error) {
        Console.Error('ListStaticBusinesses', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-static-businesses',
            data: null
        })
    }
}

export default ListStaticBusinesses