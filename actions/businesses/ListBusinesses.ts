import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { ObjectId } from '@/helpers/libs/mongo'
import { LIST_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { FETCH_LIMIT } from '@/data/constants'

const ListBusinesses = async (c: Context) => {
    try {
        const { 
            offset,
            term,
            category,
            city,
            country
        } = await DecodeBody(c)

        const filters: Record<string, unknown> = {}

        if (term) filters['Title'] = {
            $regex: term, 
            $options: 'i' 
        }

        if (category) filters['Category'] = ObjectId(category)
        if (city) filters['City'] = ObjectId(city)
        if (country) filters['Country'] = ObjectId(country)
            
        const count = await BusinessModel.countDocuments({})
        const businesses = await BusinessModel
            .find({})
            .sort({ Created_At: -1 })
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