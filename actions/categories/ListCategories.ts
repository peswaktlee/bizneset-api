import type { Context } from 'hono'

import { HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { GetCategories } from '@/helpers/entities'

const ListCategories = async (c: Context) => {
    try {
        const categories = await GetCategories()

        if (Array.isArray(categories)) {
            if (categories?.length > 0) return await HttpResponder({
                c,
                success: true,
                message: 'list-of-categories-was-retrieved-successfully',
                data: categories,
                code: 200
            })
            
            else return await HttpResponder({
                c,
                success: true,
                message: 'list-of-categories-was-retrived-but-empty',
                data: [],
                code: 200
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'list-of-categories-could-not-be-retrieved',
            data: null,
            code: 500
        })
    } 
    
    catch (error) {
        Console.Error('ListCategories', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'list-of-categories-could-not-be-retrieved',
            data: null,
            code: 500
        })
    }
}

export default ListCategories