import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware } from '@/helpers/middlewares'
import { CreateCity, ListCities } from '@/actions/cities'
import { Connect } from '@/helpers/libs/mongo'
import { CITIES_ROUTES } from '@/data/constants'

const CitiesRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        CITIES_ROUTES.CREATE_CITY, 
        Connect, 
        AuthMiddleware, 
        CreateCity
    )

    router.post(
        CITIES_ROUTES.LIST_CITIES, 
        Connect, 
        ListCities
    )

    return router
}

export default CitiesRouter