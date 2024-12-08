import type { Context } from 'hono'

import { CityModel, CountryModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'
import { CityNameValidation, CountryValidation } from '@/helpers/validations'
import { CityListSelector, CountryListSelector, STATES, CONTEXT_KEYS } from '@/data/constants'

const CreateCity = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)
        const isAdmin = user?.Admin === true

        if (isAdmin) {
            const { Name, Country } = await DecodeBody(c)

            const countries = await CountryModel.find().lean()
            const countriesIds = countries.map(country => country._id.toString())

            const nameValidation = CityNameValidation(Name)
            const countryValidation = CountryValidation(Country, countriesIds)

            const isError = nameValidation.error || countryValidation.error

            if (!isError) {
                const country = await CountryModel.findById(Country)

                if (country) {
                    const city = await CityModel.create({
                        Name: name,
                        Country: country._id,
                        Created_At: CurrentTimestamp(),
                        Updated_At: CurrentTimestamp()
                    })

                    if (city) {
                        city.save()

                        country.Cities += 1
                        country.save()

                        const countries = await CountryModel.find()
                            .select(CountryListSelector)
                            .sort({ Name: 1 })
                            .lean()

                        const cities = await CityModel.find()
                            .select(CityListSelector)
                            .sort({ Name: 1 })
                            .lean()

                        STATES.COUNTRIES = countries
                        STATES.CITIES = cities

                        return await HttpResponder({
                            c,
                            success: true,
                            message: 'city-was-created-successfully',
                            data: city,
                            code: 200
                        })
                    } 
                    
                    else return await HttpResponder({
                        c,
                        success: false,
                        message: 'city-could-not-be-created',
                        data: null,
                        code: 500
                    })
                }

                return await HttpResponder({
                    c,
                    success: false,
                    message: 'country-not-found-so-city-could-not-be-created',
                    data: null,
                    code: 404
                })
            }

            return await HttpResponder({
                c,
                success: false,
                message: 'city-was-not-created-because-of-validation-errors',
                code: 400,
                data: {
                    Name: nameValidation,
                    Country: countryValidation
                }
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'user-is-not-authorized-to-create-a-city',
            data: null,
            code: 401
        })
    } 
    
    catch (error) {
        Console.Error('CreateCity', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'city-could-not-be-created',
            data: null,
            code: 500
        })
    }
}

export default CreateCity