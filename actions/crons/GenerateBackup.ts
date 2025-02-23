import type { Context } from 'hono'

import { Console } from '@/helpers/logs'
import { HttpResponder } from '@/helpers/http'
import { GenerateBackup } from '@/helpers/api'

const CreateBackup = async (c: Context) => {
    try {
        return await GenerateBackup(c)
    }

    catch (error) {
        Console.Error('CreateBackup', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-trying-to-backup-the-database'
        })
    }
}

export default CreateBackup