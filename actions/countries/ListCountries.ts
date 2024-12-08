import type { Context } from 'hono'

import { HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { GetCountries } from '@/helpers/entities'

const ListCountries = async (c: Context) => {
    try {
        const countries = await GetCountries()

        if (Array.isArray(countries)) {
            if (countries?.length > 0) return await HttpResponder({
                c,
                success: true,
                message: 'list-of-countries-was-retrieved-successfully',
                data: countries,
                code: 200
            })
            
            else return await HttpResponder({
                c,
                success: true,
                message: 'list-of-countries-was-retrived-but-empty',
                data: [],
                code: 200
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'list-of-countries-could-not-be-retrieved',
            data: null,
            code: 500
        })
    } 
    
    catch (error) {
        Console.Error('ListCountries', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'list-of-countries-could-not-be-retrieved',
            data: null,
            code: 500
        })
    }
}

export default ListCountries
