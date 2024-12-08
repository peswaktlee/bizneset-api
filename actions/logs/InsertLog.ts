import type { Context } from 'hono'
import type { LogInterface } from '@/ts'

import { LogModel, UserModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'

const InsertLog = async (c: Context) => {
    try {
        const uid = c.get('uid')

        const { message, func, path, type } = await DecodeBody(c)

        const user = await UserModel
            .findOne({ Uid: uid })
            .select({ _id: 1, Email: 1 })
            .lean()

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

        if (user) logInstance.User = user

        const log = new LogModel(logInstance)

        if (log) {
            await log.save()

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