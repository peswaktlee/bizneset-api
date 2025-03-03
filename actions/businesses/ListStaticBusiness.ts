import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { BUSINESS_STATUSES } from '@/data/constants'

const ListStaticBusiness = async (c: Context) => {
    try {
        const { slug, selection } = await DecodeBody(c)

        const business = await BusinessModel
            .findOne({ Slug: slug, Status: BUSINESS_STATUSES.APPROVED })
            .select(selection)
            .lean()

        return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'static-business-where-listed-successfully',
            data: business
        })
    }

    catch (error) {
        Console.Error('ListStaticBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            message: 'something-went-wrong-while-listing-static-business',
            data: null
        })
    }
}

export default ListStaticBusiness