import type { Context } from 'hono'

import { CategoryModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'
import { CategoryNameValidation, CategorySlugValidation } from '@/helpers/validations'
import { CONTEXT_KEYS } from '@/data/constants'

const CreateCategory = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        const isAdmin = user?.Admin === true

        if (isAdmin) {
            const { Name, Slug } = await DecodeBody(c)


            const nameValidation = CategoryNameValidation(Name)
            const slugValidation = CategorySlugValidation(Name)

            if (!nameValidation.error && !slugValidation.error) {
                const category = await CategoryModel.create({
                    Name,
                    Slug,
                    Created_At: CurrentTimestamp(),
                    Updated_At: CurrentTimestamp()
                })

                if (category) {
                    category.save()

                    return await HttpResponder({
                        c,
                        success: true,
                        message: 'category-was-created-successfully',
                        data: category,
                        code: 200
                    })
                } 
                
                else return await HttpResponder({
                    c,
                    success: false,
                    message: 'category-could-not-be-created',
                    data: null,
                    code: 500
                })
            }

            return await HttpResponder({
                c,
                success: false,
                message: 'category-was-not-created-because-of-validation-errors',
                code: 400,
                data: {
                    Name: nameValidation,
                    Slug: slugValidation
                }
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'user-is-not-authorized-to-create-a-category',
            data: null,
            code: 401
        })
    } 
    
    catch (error) {
        Console.Error('CreateCategory', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'category-could-not-be-created',
            data: null,
            code: 500
        })
    }
}

export default CreateCategory