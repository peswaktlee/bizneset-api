import type { Context } from 'hono'

import { Console } from '@/helpers/logs'
import { HttpResponder } from '@/helpers/http'
import { BusinessModel, UserModel } from '@/data/models'
import { HandleDeletion } from '@/helpers/businesses'
import { CalculateDifference } from '@/helpers/dates'
import { BUSINESS_STATUSES, DELETE_REJECTED_AFTER_DAYS } from '@/data/constants'

const PerformCleanup = async (c: Context) => {
    try {
        const filters = {
            Status: BUSINESS_STATUSES.REJECTED
        }

        const businesses = await BusinessModel.find(filters)

        for (const business of businesses) {
            const { Delete_At, Status } = business
           
            if (Status === BUSINESS_STATUSES.REJECTED && Delete_At) {
                const { days } = CalculateDifference(Delete_At)

                if (days >= DELETE_REJECTED_AFTER_DAYS) {
                    const user = await UserModel.findOne({ _id: business.User })

                    if (user) {
                        // @ts-ignore
                        const data = await HandleDeletion(business, user)
                        if (!data) Console.Error('PerformCleanup', 'something-went-wrong-while-deleting-the-business')
                    }
        
                    else Console.Error('PerformCleanup', 'user-was-not-found')
                }
            }
        }

        return await HttpResponder({
            c,
            success: true,
            code: 200,
            data: null,
            message: 'cleanup-was-successful'
        })
    }

    catch (error) {
        Console.Error('CreateBackup', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-trying-to-perform-clean-up'
        })
    }
}

export default PerformCleanup