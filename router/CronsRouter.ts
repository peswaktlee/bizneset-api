import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { KeyMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { GenerateBackup, PerformCleanup } from '@/actions/crons'
import { CRONS_ROUTES } from '@/data/constants'

const CronsRouter = (): HonoBase => {
    const router = new Hono()

    router.get(
        CRONS_ROUTES.GENERATE_BACKUP, 
        Connect, 
        KeyMiddleware,
        GenerateBackup
    )

    router.get(
        CRONS_ROUTES.PERFORM_CLEANUP, 
        Connect, 
        KeyMiddleware,
        PerformCleanup
    )
    
    return router
}

export default CronsRouter