import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { CreateCategory, ListCategories } from '@/actions/categories'
import { CATEGORIES_ROUTES } from '@/data/constants'

const CategoriesRouter = (): HonoBase => {
    const router = new Hono()

    router.post(
        CATEGORIES_ROUTES.CREATE_CATEGORY,
        Connect,
        AuthMiddleware,
        CreateCategory
    )

    router.post(
        CATEGORIES_ROUTES.LIST_CATEGORIES,
        Connect,
        ListCategories
    )

    return router
}

export default CategoriesRouter