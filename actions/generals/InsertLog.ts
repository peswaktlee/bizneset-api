import type { Context } from 'hono'
import type { LogInterface } from '@/ts'

import { LogModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Analytics, Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'
import { ObjectId } from '@/helpers/libs/mongo'
import { CONTEXT_KEYS } from '@/data/constants'

const InsertLog = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        const { 
            message, 
            func, 
            path, 
            type 
        } = await DecodeBody(c)

        const date = CurrentTimestamp()

        // @ts-ignore
        const logInstance: LogInterface = {
            Message: message,
            Func: func,
            Type: type,
            User: null,
            Path: path,
            IsServer: typeof path !== 'string',
            Occurred_At: date
        }

        if (user) {
            const userObjectedId = ObjectId(user._id)
            
            // @ts-ignore
            if (userObjectedId) logInstance.User = userObjectedId
        }

        const log = new LogModel(logInstance)

        if (log) {
            await log.save()

            setImmediate(async () => {
                Analytics.Increase([
                    'TotalLogs'
                ])
            })

            return await HttpResponder({
                c,
                success: true,
                code: 200,
                message: 'log-was-succesfully-inserted',
                data: log
            })
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            code: 404,
            data: null,
            message: 'something-went-wrong-while-trying-to-insert-a-log'
        })
    } 
    
    catch (error) {
        Console.Error('InsertLog', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-trying-to-insert-a-log'
        })
    }
}

export default InsertLog