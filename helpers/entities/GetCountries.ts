import type { CountryInterface } from '@/ts'

import { CountryModel } from '@/data/models'
import { CountryListSelector } from '@/data/constants/Selectors'
import { STATES, ENV, ENVIRONMENTS } from '@/data/constants'

const GetCountries = async (): Promise<Array<CountryInterface>> => {
    if (ENV === ENVIRONMENTS.PROD) {
        if (STATES.COUNTRIES) return STATES.COUNTRIES
        
        else {
            const countries = await CountryModel.find()
                .select(CountryListSelector)
                .sort({ Name: 1 })
                .lean()

            STATES.COUNTRIES = countries

            return countries
        }
    } 
    
    else {
        const countries = await CountryModel.find()
            .select(CountryListSelector)
            .sort({ Name: 1 })
            .lean()

        return countries
    }
}

export default GetCountries