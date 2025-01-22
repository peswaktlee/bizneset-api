import type { Context } from 'hono'
import type { BusinessInterface } from '@/ts'

import { BusinessModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { VIEW_BUSINESS_SELECTOR } from '@/data/constants'

const ViewBusiness = async (c: Context) => {
    try {
        const { slug } = await DecodeBody(c)

        const business = await BusinessModel
            .findOne({ Slug: slug })
            .select(VIEW_BUSINESS_SELECTOR)
            .lean() as BusinessInterface

        if (business) return await HttpResponder({
            c,
            success: true,
            code: 200,
            message: 'business-was-loaded-successfully',
            data: business
        })
        
        else return await HttpResponder({
            c,
            success: false,
            code: 404,
            data: null,
            message: 'business-was-not-found-in-the-database'
        })
    }

    catch (error) {
        Console.Error('ViewBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-loading-the-business'
        })
    }
}

export default ViewBusiness