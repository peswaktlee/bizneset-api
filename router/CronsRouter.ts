import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { KeyMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { HandleSave } from '@/actions/saves'
import { CRONS_ROUTES } from '@/data/constants'

const CronsRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        CRONS_ROUTES.GENERATE_BACKUP, 
        Connect, 
        KeyMiddleware,
        HandleSave
    )
    return router
}

export default CronsRouter