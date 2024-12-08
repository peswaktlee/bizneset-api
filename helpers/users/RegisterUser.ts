import type { Context } from 'hono'

import { UserModel } from '@/data/models'
import { HttpResponder } from '@/helpers/http'
import { CurrentTimestamp } from '@/helpers/dates'
import { DeleteFirebaseAccount } from '@/helpers/libs/firebase'
import { Console } from '@/helpers/logs'

const RegisterUser = async (
    c: Context, 
    uid: string,
    name: string,
    email: string,
    avatar: string
) => {
    try {
        const initial_user = new UserModel({
            Uid: uid,
            Name: name || '',
            Email: email,
            Avatar: avatar,
            LastVisited: CurrentTimestamp(),
            Created_At: CurrentTimestamp(),
            Updated_At: CurrentTimestamp()
        })

        await initial_user.save()

        return await HttpResponder({
            c,
            success: true,
            message: 'user-was-loged-in-successfully',
            code: 200,
            data: initial_user
        })
    }

    catch (error) {
        Console.Error('RegisterUser', error)

        await DeleteFirebaseAccount(uid)
        
        return await HttpResponder({
            c,
            success: false,
            message: 'user-was-not-authed-because-of-a-problem',
            data: null,
            code: 500
        })
    }
}

export default RegisterUser