import type { Context } from 'hono'

import { CountryModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'
import { CountryCodeValidation, CountryNameValidation } from '@/helpers/validations'
import { CONTEXT_KEYS, CountryListSelector, STATES } from '@/data/constants'

const CreateCountry = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        const isAdmin = user?.Admin === true

        if (isAdmin) {
            const { Name, Code } = await DecodeBody(c)

            const nameValidation = CountryNameValidation(Name)
            const codeValidation = CountryCodeValidation(Code)

            const isError = nameValidation.error || codeValidation.error

            if (!isError) {
                const country = await CountryModel.create({
                    Name,
                    Code,
                    Created_At: CurrentTimestamp(),
                    Updated_At: CurrentTimestamp()
                })
    
                if (country) {
                    country.save()
    
                    const countries = await CountryModel.find()
                        .select(CountryListSelector)
                        .sort({ Name: 1 })
                        .lean()
    
                    STATES.COUNTRIES = countries
    
                    return await HttpResponder({
                        c,
                        success: true,
                        message: 'country-was-created-successfully',
                        data: country,
                        code: 200
                    })
                } 
                
                else return await HttpResponder({
                    c,
                    success: false,
                    message: 'country-could-not-be-created',
                    data: null,
                    code: 500
                })
            }

            return await HttpResponder({
                c,
                success: false,
                message: 'country-was-not-created-because-of-validation-errors',
                code: 400,
                data: {
                    Name: nameValidation,
                    Code: codeValidation
                }
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'user-is-not-authorized-to-create-a-country',
            data: null,
            code: 401
        })
    } 
    
    catch (error) {
        Console.Error('CreateCountry', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'country-could-not-be-created',
            data: null,
            code: 500
        })
    }
}

export default CreateCountry
