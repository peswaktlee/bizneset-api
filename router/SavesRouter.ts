import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware, OptionalAuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { HandleSave, ListSaves } from '@/actions/saves'
import { SAVES_ROUTES } from '@/data/constants'

const SavesRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        SAVES_ROUTES.HANDLE_SAVE, 
        Connect, 
        OptionalAuthMiddleware,
        HandleSave
    )

    router.post(
        SAVES_ROUTES.LIST_SAVES, 
        Connect, 
        AuthMiddleware, 
        ListSaves
    )

    return router
}

export default SavesRouter