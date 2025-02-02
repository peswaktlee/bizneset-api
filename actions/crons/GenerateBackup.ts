import type { Context } from 'hono'

import { Console } from '@/helpers/logs'
import { HttpResponder } from '@/helpers/http'
import { GenerateBackup } from '@/helpers/api'
import { CONTEXT_KEYS } from '@/data/constants'

const CreateBackupCron = async (c: Context) => {
    try {
        const admin = c.get(CONTEXT_KEYS.ADMIN)

        if (admin) return await GenerateBackup(c)
        else return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'user-was-not-found-or-the-user-has-no-permissions-to-generate-a-backup'
        })
    }

    catch (error) {
        Console.Error('CreateBackupCron', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-trying-to-backup-the-database'
        })
    }
}

export default CreateBackupCron