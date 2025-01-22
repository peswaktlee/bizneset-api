import type { Context } from 'hono'
import type { SaveInterface } from '@/ts'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { SaveModel } from '@/data/models'
import { LIST_BUSINESSES_SELECTOR } from '@/data/constants/Selectors'
import { CONTEXT_KEYS, FETCH_LIMIT, MODELS } from '@/data/constants'

const ListSaves = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        
        if (user) {
            const { offset } = await DecodeBody(c)

            const filters = {
                User: user._id
            }
                
            const count = await SaveModel.countDocuments(filters)
            const savesUnformatted = await SaveModel
                .find(filters)
                .sort({ Saved_At: -1 })
                .select(LIST_BUSINESSES_SELECTOR)
                .skip(offset)
                .populate(MODELS.BUSINESS)
                .limit(FETCH_LIMIT)
                .lean()

            const saves = savesUnformatted.map((save: SaveInterface) => {
                return {
                    ...save?.Business
                }
            })

            if (saves) return await HttpResponder({
                c,
                success: true,
                code: 200,
                message: 'saves-where-listed-successfully',
                data: {
                    saves,
                    count
                }
            })

            else return await HttpResponder({
                c,
                success: false,
                code: 400,
                message: 'something-went-wrong-while-listing-saves',
                data: {
                    saves: [],
                    count: 0
                }
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 401,
            message: 'user-is-not-authorized-to-list-saves',
            data: {
                saves: [],
                count: 0
            }
        })
    }

    catch (error) {
        Console.Error('ListSaves', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-saves',
            data: {
                saves: [],
                count: 0
            }
        })
    }
}

export default ListSaves