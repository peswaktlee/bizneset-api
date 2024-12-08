import { Env, Hono } from 'hono'
import { handle } from 'hono/vercel'
import { GlobalMiddlewares } from '@/helpers/api'
import { CatchAll } from '@/helpers/router'
import { GROUP_ROUTES } from '@/data/constants'

import { 
    Businesses, 
    Categories, 
    Cities, 
    Countries, 
    Logs, 
    Users 
} from '@/router'
import { Connect } from '@/helpers/libs/mongo'

const app = new Hono()

const ApplyGlobalMiddlewares = (route: string, handler: Hono<Env, {}, '/'>) => {
    GlobalMiddlewares(route, app)
    app.route(route, handler)
}

ApplyGlobalMiddlewares(GROUP_ROUTES.BUSINESS, Businesses())
ApplyGlobalMiddlewares(GROUP_ROUTES.CATEGORIES, Categories())
ApplyGlobalMiddlewares(GROUP_ROUTES.COUNTRIES, Countries())
ApplyGlobalMiddlewares(GROUP_ROUTES.CITIES, Cities())
ApplyGlobalMiddlewares(GROUP_ROUTES.LOGS, Logs())
ApplyGlobalMiddlewares(GROUP_ROUTES.USERS, Users())

app.notFound(CatchAll)

Connect(null, null)

export const POST = handle(app)
export const GET = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)