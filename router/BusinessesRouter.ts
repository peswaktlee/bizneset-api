import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware, OptionalAuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { BUSINESSES_ROUTES } from '@/data/constants'

import {
    SubmitBusiness,
    DeleteBusiness,
    ListBusinesses,
    ViewBusiness,
    ListUserBusinesses,
    ListSimilarBusinesses
} from '@/actions/businesses'

const BusinessesRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        BUSINESSES_ROUTES.SUBMIT_BUSINESS, 
        Connect, 
        AuthMiddleware, 
        SubmitBusiness
    )

    router.post(
        BUSINESSES_ROUTES.DELETE_BUSINESS, 
        Connect, 
        AuthMiddleware, 
        DeleteBusiness
    )

    router.post(
        BUSINESSES_ROUTES.LIST_BUSINESSES, 
        Connect, 
        OptionalAuthMiddleware, 
        ListBusinesses
    )

    router.post(
        BUSINESSES_ROUTES.VIEW_BUSINESS, 
        Connect, 
        OptionalAuthMiddleware, 
        ViewBusiness
    )

    router.post(
        BUSINESSES_ROUTES.LIST_USER_BUSINESSES, 
        Connect, 
        AuthMiddleware, 
        ListUserBusinesses
    )

    router.post(
        BUSINESSES_ROUTES.LIST_SIMILAR_BUSINESSES, 
        Connect, 
        OptionalAuthMiddleware, 
        ListSimilarBusinesses
    )

    return router
}

export default BusinessesRouter