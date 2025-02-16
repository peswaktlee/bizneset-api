import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { OptionalAuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { InsertLog } from '@/actions/logs'
import { LOGS_ROUTES } from '@/data/constants'

const LogsRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        LOGS_ROUTES.CREATE_LOG,
        Connect,
        OptionalAuthMiddleware,
        InsertLog
    )

    return router
}

export default LogsRouter