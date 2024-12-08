import type { Context } from 'hono'

import { HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { GetCities } from '@/helpers/entities'

const ListCities = async (c: Context) => {
    try {
        const cities = await GetCities()

        if (Array.isArray(cities)) {
            if (cities?.length > 0) return await HttpResponder({
                c,
                success: true,
                message: 'list-of-cities-was-retrieved-successfully',
                data: cities,
                code: 200
            })
            
            else return await HttpResponder({
                c,
                success: true,
                message: 'list-of-cities-was-retrived-but-empty',
                data: [],
                code: 200
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'list-of-cities-could-not-be-retrieved',
            data: null,
            code: 500
        })
    } 
    
    catch (error) {
        Console.Error('ListCities', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'list-of-cities-could-not-be-retrieved',
            data: null,
            code: 500
        })
    }
}

export default ListCities