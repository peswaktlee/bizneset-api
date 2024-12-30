import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { LIST_SIMILAR_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { SIMILAR_BUSINESSES_FETCH_LIMIT } from '@/data/constants'

const ListSimilarBusinesses = async (c: Context) => {
    try {
        const { categoryId } = await DecodeBody(c)
            
        const businesses = await BusinessModel
            .find({})
            .select(LIST_SIMILAR_BUSINESSES_SELECTOR)
            .limit(SIMILAR_BUSINESSES_FETCH_LIMIT)
            .lean()

        if (businesses) return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'similar-businesses-where-listed-successfully',
            data: businesses
        })

        else return await HttpResponder({
            c,
            success: false,
            code: 400,
            message: 'something-went-wrong-while-listing-similar-businesses',
            data: {
                businesses: [],
                count: 0
            }
        })
    }

    catch (error) {
        Console.Error('ListSimilarBusinesses', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-similar-businesses',
            data: []
        })
    }
}

export default ListSimilarBusinesses