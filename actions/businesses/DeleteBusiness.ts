import type { Context } from 'hono'

import { BusinessModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { ObjectId } from '@/helpers/libs/mongo'
import { Console } from '@/helpers/logs'
import { HandleDeletion } from '@/helpers/businesses'
import { CONTEXT_KEYS } from '@/data/constants'

const DeleteBusiness = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const { businessId } = await DecodeBody(c)

            const filter = { 
                _id: ObjectId(businessId),
                User: ObjectId(user?._id)
            }

            const business = await BusinessModel.findOne(filter)

            if (!business) return await HttpResponder({
                c,
                success: false,
                code: 404,
                data: null,
                message: 'business-was-not-found'
            })

            else {
                const data = await HandleDeletion(business, user)

                if (data) return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-was-deleted-successfully',
                    data: data
                })

                else return await HttpResponder({
                    c,
                    success: false,
                    code: 500,
                    data: null,
                    message: 'something-went-wrong-while-deleting-the-business'
                })
            }
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 404,
            data: null,
            message: 'user-was-not-found-or-is-not-authorized-to-delete-this-business'
        })
    }

    catch (error) {
        Console.Error('DeleteBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-deleting-the-business'
        })
    }
}

export default DeleteBusiness