import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware } from '@/helpers/middlewares'
import { CreateCountry, ListCountries } from '@/actions/countries'
import { Connect } from '@/helpers/libs/mongo'
import { COUNTRIES_ROUTES } from '@/data/constants'

const CountriesRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        COUNTRIES_ROUTES.CREATE_COUNTRY,
        Connect,
        AuthMiddleware,
        CreateCountry
    )

    router.post(
        COUNTRIES_ROUTES.LIST_COUNTRIES,
        Connect,
        ListCountries
    )

    return router
}

export default CountriesRouter