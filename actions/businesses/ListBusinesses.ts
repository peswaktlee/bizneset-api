import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel, SaveModel } from '@/data/models'
import { ObjectId } from '@/helpers/libs/mongo'
import { LIST_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { BUSINESS_STATUSES, CONTEXT_KEYS, FETCH_LIMIT } from '@/data/constants'

const ListBusinesses = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        const { 
            offset,
            term,
            category,
            city,
            country
        } = await DecodeBody(c)

        const filters: Record<string, unknown> = {
            Status: BUSINESS_STATUSES.APPROVED
        }

        if (term) filters['Title'] = {
            $regex: term, 
            $options: 'i' 
        }

        if (category) filters['Category'] = ObjectId(category)
        if (city) filters['City'] = ObjectId(city)
        if (country) filters['Country'] = ObjectId(country)
            
        const count = await BusinessModel.countDocuments(filters)
        const businesses = await BusinessModel
            .find(filters)
            .sort({ Created_At: -1 })
            .select(LIST_BUSINESSES_SELECTOR)
            .skip(offset)
            .limit(FETCH_LIMIT)
            .lean()

        if (businesses) {
            const businessesIds = businesses.map(business => business?._id?.toString())

            setImmediate(async () => {
                await BusinessModel.updateMany({ _id: { $in: businessesIds } }, {
                    $inc: { Reach: 1 }
                })
            })

            const businessesPromises = businesses.map(async (business) => {
                const saved = user ? await SaveModel.exists({ 
                    User: user?._id, 
                    Business: business?._id
                }) : false
            
                return {
                    ...business,
                    Saved: saved ? true : false
                }
            })
            
            const businessesAll = await Promise.all(businessesPromises)

            return await HttpResponder({
                c,
                success: true,
                code: 200,
                message: 'businesses-where-listed-successfully',
                data: {
                    businesses: businessesAll,
                    count
                }
            })
        }

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