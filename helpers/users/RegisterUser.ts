import type { RegisterUserFunctionProps, UserInterface } from '@/ts'

import { UserModel } from '@/data/models'
import { HttpResponder } from '@/helpers/http'
import { CurrentTimestamp } from '@/helpers/dates'
import { DeleteFirebaseAccount } from '@/helpers/libs/firebase'
import { Analytics, Console } from '@/helpers/logs'
import { AddContact } from '@/helpers/libs/resend'
import { AutoUpdateAvatar } from '@/actions/users'

const RegisterUser = async (props: RegisterUserFunctionProps) => {
    const {
        c, 
        uid,
        name,
        surname,
        email,
        phone,
        avatar
    } = props

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
            Last_Avatar_Update_At: CurrentTimestamp(),
            Created_At: CurrentTimestamp(),
            Updated_At: CurrentTimestamp()
        })

        await initial_user.save()

        Analytics.Increase([
            'TotalUsers'
        ])

        await AutoUpdateAvatar(avatar, uid)
        await AddContact(initial_user)

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