import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { SaveModel } from '@/data/models'
import { CurrentTimestamp } from '@/helpers/dates'
import { CONTEXT_KEYS } from '@/data/constants'

const HandleSave = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        
        if (user) {
            const { businessId } = await DecodeBody(c)

            const saveExists = await SaveModel.findOne({
                User: user?._id,
                Business: businessId
            })

            if (saveExists) {
                await SaveModel.deleteOne({
                    User: user?._id,
                    Business: businessId
                })

                user.Saves -= 1
                await user.save()

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-was-deleted-from-saves-successfully',
                    data: {
                        isRemoved: true,
                        isAdded: false
                    }
                })

            }

            else {
                const instance = new SaveModel({
                    User: user?._id,
                    Business: businessId,
                    Saved_At: CurrentTimestamp()
                })

                await instance.save()

                user.Saves += 1
                await user.save()

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-was-saved-successfully',
                    data: {
                        isRemoved: false,
                        isAdded: true
                    }
                })
            }
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 401,
            message: 'user-is-not-authorized-to-save-businesses',
            data: null
        })
    }

    catch (error) {
        Console.Error('HandleSave', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-handling-business-save',
            data: null
        })
    }
}

export default HandleSave