
import type { Context } from 'hono'
import type { UserInterface } from '@/ts'

import { UserModel } from '@/data/models'
import { HttpResponder } from '@/helpers/http'
import { CheckDifference, CurrentTimestamp } from '@/helpers/dates'
import { AutoUpdateAvatar } from '@/actions/users'

const LoginUser = async (c: Context, user: UserInterface, avatar: string) => {
    let shouldUpdate = false
    const lastUpdate = user?.Last_Avatar_Update_At

    if (lastUpdate) {
        // @ts-ignore
        const daysDifference = CheckDifference(lastUpdate, 'days')
        if (daysDifference > 7) shouldUpdate = true
    }

    else shouldUpdate = true

    if (shouldUpdate) {
        await AutoUpdateAvatar(avatar, user?.Uid)

        await UserModel.updateOne({ Uid: user?.Uid }, {
            $set: {
                Last_Avatar_Update_At: CurrentTimestamp(),
                Last_Active_At: CurrentTimestamp()
            },
            $inc:{
                Visits: 1
            }
        })
    }

    else setTimeout(async () => {
        await UserModel.updateOne({ Uid: user?.Uid }, {
            $set: {
                Last_Active_At: CurrentTimestamp()
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