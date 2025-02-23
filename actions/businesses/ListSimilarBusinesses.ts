import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Analytics, Console } from '@/helpers/logs'
import { BusinessModel, SaveModel } from '@/data/models'
import { LIST_SIMILAR_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { BUSINESS_STATUSES, CONTEXT_KEYS, SIMILAR_BUSINESSES_FETCH_LIMIT, SIMILAR_BUSINESSES_SORTS } from '@/data/constants'

const ListSimilarBusinesses = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        
        const { categoryId, businessId } = await DecodeBody(c)

        const filters = {
            Category: categoryId, 
            _id: { $ne: businessId }, 
            Status: BUSINESS_STATUSES.APPROVED
        }

        const randomSort = SIMILAR_BUSINESSES_SORTS[Math.floor(Math.random() * SIMILAR_BUSINESSES_SORTS.length)]
            
        const businesses = await BusinessModel
            .find(filters)
            .select(LIST_SIMILAR_BUSINESSES_SELECTOR)
            .limit(SIMILAR_BUSINESSES_FETCH_LIMIT)
            // @ts-ignore
            .sort(randomSort)
            .lean()

        if (businesses) {
            const businessesIds = businesses.map(business => business?._id?.toString())

            setImmediate(async () => {
                await BusinessModel.updateMany({ _id: { $in: businessesIds } }, {
                    $inc: { Reach: 1 }
                })

                Analytics.IncreaseDecreaseBulk({
                    TotalBusinessesReach: businessesIds?.length
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
                message: 'similar-businesses-where-listed-successfully',
                data: businessesAll
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 400,
            message: 'something-went-wrong-while-listing-similar-businesses',
            data: []
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