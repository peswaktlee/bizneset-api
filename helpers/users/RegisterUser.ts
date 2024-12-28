import type { Context } from 'hono'
import type { UserInterface } from '@/ts'

import { UserModel } from '@/data/models'
import { HttpResponder } from '@/helpers/http'
import { CurrentTimestamp } from '@/helpers/dates'
import { DeleteFirebaseAccount } from '@/helpers/libs/firebase'
import { Console } from '@/helpers/logs'

const RegisterUser = async (
    c: Context, 
    uid: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    avatar: string
) => {
    try {
        const user_inital_data: Partial<UserInterface> = {
            Uid: uid,
            Email: email
        }

        if (name) user_inital_data.Name = name
        if (surname) user_inital_data.Surname = surname
        if (phone) user_inital_data.Phone = phone
        if (avatar) user_inital_data.Avatar = avatar

        const initial_user = new UserModel({
            ...user_inital_data,
            Last_Active_At: CurrentTimestamp(),
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