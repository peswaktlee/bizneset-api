import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware, KeyMiddleware, OptionalAuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { BUSINESSES_ROUTES } from '@/data/constants'

import {
    SubmitBusiness,
    DeleteBusiness,
    ListBusinesses,
    ViewBusiness,
    ListUserBusinesses,
    ListSimilarBusinesses,
    ApproveBusiness,
    RejectBusiness,
    ListAdminBusinesses,
    ViewBusinessEdit,
    ListStaticBusinesses,
    ListStaticBusiness
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
        AuthMiddleware, 
        ViewBusiness
    )

    router.post(
        BUSINESSES_ROUTES.VIEW_BUSINESS_EDIT, 
        Connect, 
        OptionalAuthMiddleware, 
        ViewBusinessEdit
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

    router.post(
        BUSINESSES_ROUTES.APPROVE_BUSINESS, 
        Connect, 
        AuthMiddleware, 
        ApproveBusiness
    )

    router.post(
        BUSINESSES_ROUTES.REJECT_BUSINESS, 
        Connect, 
        AuthMiddleware, 
        RejectBusiness
    )

    router.post(
        BUSINESSES_ROUTES.LIST_ADMIN_BUSINESSES, 
        Connect, 
        AuthMiddleware, 
        ListAdminBusinesses
    )

    router.post(
        BUSINESSES_ROUTES.LIST_STATIC_BUSINESSES, 
        Connect, 
        KeyMiddleware, 
        ListStaticBusinesses
    )

    router.post(
        BUSINESSES_ROUTES.LIST_STATIC_BUSINESS, 
        Connect, 
        KeyMiddleware, 
        ListStaticBusiness
    )

    return router
}

export default BusinessesRouter