import type { Context, Next } from 'hono'

import { connect } from 'mongoose'

import {
    MONGO_CLUSTER,
    MONGO_DB_NAME,
    MONGO_DB_PASSWORD,
    MONGO_DB_ADMIN
} from '@/data/constants'

const Connect = async (_: Context | null, next: Next | null): Promise<void> => {
    const USERNAME = MONGO_DB_ADMIN
    const PASSWORD = MONGO_DB_PASSWORD
    const CLUSTER = MONGO_CLUSTER
    const DATABASE_NAME = MONGO_DB_NAME

    console.log({
        USERNAME,
        PASSWORD,
        MONGO_CLUSTER,
        DATABASE_NAME
    })

    const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`
    console.log(URI)
    await connect(URI)

    if (next) await next()
}

export default Connect