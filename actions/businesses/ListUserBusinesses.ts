import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { LIST_USER_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { CONTEXT_KEYS, FETCH_LIMIT } from '@/data/constants'

const ListUserBusinesses = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const { offset } = await DecodeBody(c)

            const filters = {
                User: user._id
            }
            
            const count = await BusinessModel.countDocuments(filters)
            const userBusinesses = await BusinessModel
                .find(filters)
                .sort({ Created_At: -1 })
                .select(LIST_USER_BUSINESSES_SELECTOR)
                .skip(offset)
                .limit(FETCH_LIMIT)
                .lean()

            if (userBusinesses) return await HttpResponder({
                c,
                success: true,
                code: 200,
                message: 'user-businesses-where-listed-successfully',
                data: {
                    businesses: userBusinesses,
                    count
                }
            })

            else return await HttpResponder({
                c,
                success: false,
                code: 400,
                message: 'something-went-wrong-while-listing-user-businesses',
                data: {
                    businesses: [],
                    count: 0
                }
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 401,
            message: 'user-is-not-not-authorised-to-list-user-businesses',
            data: {
                businesses: [],
                count: 0
            }
        })
    }

    catch (error) {
        Console.Error('ListUserBusinesses', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-user-businesses',
            data: {
                businesses: [],
                count: 0
            }
        })
    }
}

export default ListUserBusinesses