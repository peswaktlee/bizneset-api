import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { LIST_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { BUSINESS_STATUSES, CONTEXT_KEYS, FETCH_LIMIT, USER_ROLES } from '@/data/constants'

const ListAdminBusinesses = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        const isAdmin = user?.Role === USER_ROLES.ADMIN

        if (isAdmin) {
            const { offset } = await DecodeBody(c)

            const filters: Record<string, unknown> = {
                Status: BUSINESS_STATUSES.PENDING
            }
                
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

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'businesses-for-approval-where-listed-successfully',
                    data: {
                        businesses,
                        count
                    }
                })
            }

            else return await HttpResponder({
                c,
                success: false,
                code: 400,
                message: 'something-went-wrong-while-listing-businesses-for-approval',
                data: {
                    businesses: [],
                    count: 0
                }
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 403,
            message: 'user-is-not-authorized-to-list-businesses-for-approval',
            data: {
                businesses: [],
                count: 0
            }
        })
    }

    catch (error) {
        Console.Error('ListAdminBusinesses', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-businesses-for-approval',
            data: {
                businesses: [],
                count: 0
            }
        })
    }
}

export default ListAdminBusinesses