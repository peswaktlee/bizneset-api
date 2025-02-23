import type { HonoBase } from 'hono/hono-base'

import { Hono } from 'hono'
import { AuthMiddleware, KeyMiddleware } from '@/helpers/middlewares'
import { Connect } from '@/helpers/libs/mongo'
import { CreateCategory, ListCategories, ListStaticCategories, ListStaticCategory } from '@/actions/categories'
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

    router.post(
        CATEGORIES_ROUTES.LIST_STATIC_CATEGORIES, 
        Connect, 
        KeyMiddleware, 
        ListStaticCategories
    )

    router.post(
        CATEGORIES_ROUTES.LIST_STATIC_CATEGORY, 
        Connect, 
        KeyMiddleware, 
        ListStaticCategory
    )

    return router
}

export default CategoriesRouter