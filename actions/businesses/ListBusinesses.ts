import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { LIST_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { FETCH_LIMIT } from '@/data/constants'

const ListBusinesses = async (c: Context) => {
    try {
        const { offset } = await DecodeBody(c)
            
        const count = await BusinessModel.countDocuments({})
        const businesses = await BusinessModel
            .find({})
            .sort({ Updated_At: -1 })
            .select(LIST_BUSINESSES_SELECTOR)
            .skip(offset)
            .limit(FETCH_LIMIT)
            .lean()

        if (businesses) return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'businesses-where-listed-successfully',
            data: {
                businesses,
                count
            }
        })

        else return await HttpResponder({
            c,
            success: false,
            code: 400,
            message: 'something-went-wrong-while-listing-businesses',
            data: {
                businesses: [],
                count: 0
            }
        })
    }

    catch (error) {
        Console.Error('ListBusinesses', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-businesses',
            data: {
                businesses: [],
                count: 0
            }
        })
    }
}

export default ListBusinesses