import { Env, Hono } from 'hono'
import { handle } from 'hono/vercel'
import { GlobalMiddlewares } from '@/helpers/api'
import { CatchAll } from '@/helpers/router'
import { Connect } from '@/helpers/libs/mongo'
import { GROUP_ROUTES } from '@/data/constants'

import { 
    BusinessesRouter, 
    CategoriesRouter, 
    CronsRouter, 
    GeneralsRouter, 
    SavesRouter, 
    UsersRouter 
} from '@/router'

const app = new Hono()

const ApplyGlobalMiddlewares = (route: string, handler: Hono<Env, {}, '/'>) => {
    GlobalMiddlewares(route, app)
    app.route(route, handler)
}

ApplyGlobalMiddlewares(GROUP_ROUTES.BUSINESSES, BusinessesRouter())
ApplyGlobalMiddlewares(GROUP_ROUTES.CATEGORIES, CategoriesRouter())
ApplyGlobalMiddlewares(GROUP_ROUTES.USERS, UsersRouter())
ApplyGlobalMiddlewares(GROUP_ROUTES.SAVES, SavesRouter())
ApplyGlobalMiddlewares(GROUP_ROUTES.CRONS, CronsRouter())
ApplyGlobalMiddlewares(GROUP_ROUTES.GENERALS, GeneralsRouter())

app.notFound(CatchAll)

Connect(null, null)

export const POST = handle(app)
export const GET = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)