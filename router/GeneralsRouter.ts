import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware, OptionalAuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { InsertLog, ListAnalytics } from '@/actions/generals'
import { GENERALS_ROUTES } from '@/data/constants'

const GeneralsRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        GENERALS_ROUTES.CREATE_LOG,
        Connect,
        OptionalAuthMiddleware,
        InsertLog
    )

    router.post(
        GENERALS_ROUTES.LIST_ANALYTICS,
        Connect,
        AuthMiddleware,
        ListAnalytics
    )

    return router
}

export default GeneralsRouter