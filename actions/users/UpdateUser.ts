/* eslint-disable no-self-assign */

import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { CurrentTimestamp } from '@/helpers/dates'
import { CityModel, CountryModel } from '@/data/models'
import { Console } from '@/helpers/logs'
import { ObjectId } from '@/helpers/libs/mongo'
import { CONTEXT_KEYS } from '@/data/constants'

import {
    CityValidation,
    UserNameValidation,
    UserSurnameValidation,
    CountryValidation
} from '@/helpers/validations'

const UpdateUser = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const { 
                Name, 
                Surname, 
                Avatar, 
                City, 
                Country,
                BloodGroup
            } = await DecodeBody(c)
    
            const cities = await CityModel.find({}).lean()
            const countries = await CountryModel.find({}).lean()
            const citiesIds = cities.map(city => city._id.toString())
            const countriesIds = countries.map(country => country._id.toString())
    
            const nameValidation = UserNameValidation(Name)
            const surnameValidation = UserSurnameValidation(Surname)
            const cityValidation = CityValidation(City, citiesIds)
            const countryValidation = CountryValidation(Country, countriesIds)
    
            const isError =
                nameValidation.error ||
                surnameValidation.error ||
                cityValidation.error ||
                countryValidation.error
    
            if (!isError) {
                user.Name = Name
                user.Surname = Surname
                user.Avatar = Avatar
                user.Updated_At = CurrentTimestamp()
                user.ProfileCompleted = true
    
                const oldCity = await CityModel.findById(user.City)

                if (oldCity) {
                    oldCity.Users = oldCity.Users - 1
                    await oldCity.save()
                }

                const newCity = await CityModel.findById(City)
    
                if (newCity) {
                    newCity.Users = newCity.Users + 1
                    await newCity.save()
                }

                const oldCountry = await CountryModel.findById(user.Country)

                if (oldCountry) {
                    oldCountry.Users = oldCountry.Users - 1
                    await oldCountry.save()
                }

                const newCountry = await CountryModel.findById(Country)

                if (newCountry) {
                    newCountry.Users = newCountry.Users + 1
                    await newCountry.save()
                }

                user.City = ObjectId(City)
                user.Country = ObjectId(Country)
    
                await user.save()
    
                return await HttpResponder({
                    c,
                    success: true,
                    message: 'user-was-updated-successfully',
                    data: user,
                    code: 200
                })
            }
    
            else return await HttpResponder({
                c,
                success: false,
                message: 'user-could-not-be-updated-beacuse-the-body-data-is-invalid',
                code: 400,
                data: {
                    Name: nameValidation,
                    Surname: surnameValidation,
                    City: cityValidation,
                    Country: countryValidation
                }
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            message: 'user-was-not-found-so-user-could-not-be-updated',
            data: null,
            code: 404
        })
    } 
    
    catch (error) {
        Console.Error('UpdateUser', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'user-could-not-be-updated-because-something-went-wrong',
            data: null,
            code: 500
        })
    }
}

export default UpdateUser
