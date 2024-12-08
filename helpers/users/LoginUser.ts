
import type { Context } from 'hono'
import type { UserInterface } from '@/ts'

import { UserModel } from '@/data/models'
import { HttpResponder } from '@/helpers/http'
import { CurrentTimestamp } from '@/helpers/dates'

const LoginUser = async (
    c: Context, 
    user: UserInterface, 
    uid: string
) => {
    setTimeout(async () => {
        await UserModel.updateOne({ Uid: uid }, {
            $set: {
                LastVisited: CurrentTimestamp()
            },
            $inc:{
                Visits: 1
            }
        })
    }, 1)

    return await HttpResponder({
        c,
        success: true,
        message: 'user-was-loged-in-successfully',
        code: 200,
        data: user
    })
}

export default LoginUser