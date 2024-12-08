import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { BUSINESSES_ROUTES } from '@/data/constants'

import {
    CreateBusiness,
    DeleteBusiness,
    ListBusinesses,
    ListBusiness,
    ListUserBusinesses
} from '@/actions/businesses'

const PostsRouter = (): HonoBase => {
    const router = new Hono()

    router.post(BUSINESSES_ROUTES.CREATE_BUSINESS, Connect, AuthMiddleware, CreateBusiness)
    router.post(BUSINESSES_ROUTES.DELETE_BUSINESS, Connect, AuthMiddleware, DeleteBusiness)
    router.post(BUSINESSES_ROUTES.LIST_BUSINESSES, Connect, AuthMiddleware, ListBusinesses)
    router.post(BUSINESSES_ROUTES.LIST_BUSINESSES, Connect, AuthMiddleware, ListBusiness)
    router.post(BUSINESSES_ROUTES.LIST_USER_BUSINESSES, Connect, AuthMiddleware, ListUserBusinesses)

    return router
}

export default PostsRouter