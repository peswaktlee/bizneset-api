import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware, OptionalAuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { USERS_ROUTES } from '@/data/constants'

import {
    AuthUser,
    UpdateUser,
    UpdateAvatar
} from '@/actions/users'

const UserSavesRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        USERS_ROUTES.AUTH_USER, 
        Connect, 
        OptionalAuthMiddleware,
        AuthUser
    )

    router.post(
        USERS_ROUTES.UPDATE_AVATAR, 
        Connect, 
        AuthMiddleware, 
        UpdateAvatar
    )

    router.post(
        USERS_ROUTES.UPDATE_USER, 
        Connect, 
        AuthMiddleware, 
        UpdateUser
    )

    return router
}

export default UserSavesRouter