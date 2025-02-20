import type { Context } from 'hono'

import { AnalyticModel } from '@/data/models'
import { HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CONTEXT_KEYS } from '@/data/constants'

const ListAnalytics = async (c: Context) => {
    try {
        const admin = c.get(CONTEXT_KEYS.ADMIN)

        if (admin) {
            const analytics = await AnalyticModel
                .find()
                .lean()

            const analytic = Array.isArray(analytics) ? analytics[0] : null

            if (analytic) return await HttpResponder({
                c,
                success: true,
                code: 200,
                data: analytic,
                message: 'analytics-was-retrieved-successfully'
            })

            else return await HttpResponder({
                c,
                success: false,
                code: 404,
                data: null,
                message: 'no-analytics-was-found'
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 404,
            data: null,
            message: 'user-is-not-authroized-to-retreive-analytics'
        })
    }

    catch (error) {
        Console.Error('ListAnalytics', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-retrieving-analytics'
        })
    }
}

export default ListAnalytics