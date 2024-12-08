import type { CityInterface } from '@/ts'

import { CityModel } from '@/data/models'
import { CityListSelector } from '@/data/constants'
import { STATES, ENV, ENVIRONMENTS } from '@/data/constants'

const GetCities = async (): Promise<Array<CityInterface>> => {
    if (ENV === ENVIRONMENTS.PROD) {
        if (STATES.CITIES) return STATES.CITIES

        else {
            const cities = await CityModel.find()
                .select(CityListSelector)
                .sort({ Name: 1 })
                .lean()

            STATES.CITIES = cities

            return cities
        }
    } 
    
    else {
        const cities = await CityModel.find()
            .select(CityListSelector)
            .sort({ Name: 1 })
            .lean()

        return cities
    }
}

export default GetCities