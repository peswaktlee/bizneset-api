import type { Context } from 'hono'

import sharp from 'sharp'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { DeleteFile, UploadToBucket } from '@/helpers/libs/cloudflare'
import { CurrentTimestamp } from '@/helpers/dates'

import { 
    CLOUDFLARE_CDN_BUCKET,
    CLOUDFLARE_CDN_PATHS, 
    CONTEXT_KEYS, 
    FILE_EXTENSIONS, 
    FILE_TYPES 
} from '@/data/constants'

const UpdateAvatar = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const { avatar } = await DecodeBody(c)

            const path = `${CLOUDFLARE_CDN_PATHS.AVATARS}/${user._id}.${FILE_EXTENSIONS.WEBP}`

            if (avatar) {
                const deletePreviousAvatar = await DeleteFile(path, CLOUDFLARE_CDN_BUCKET)

                if (deletePreviousAvatar) {
                    const base64 = avatar
                    const base64buffer = Buffer.from(base64, 'base64')
    
                    const base64pro = await sharp(base64buffer)
                        .resize(250, 250)
                        .webp({ quality: 100 })
                        .toBuffer()
    
                    const uploaded = await UploadToBucket({
                        bucket: CLOUDFLARE_CDN_BUCKET,
                        path,
                        file: base64pro,
                        type: FILE_TYPES.IMAGE.WEBP,
                        publicObject: true
                    })
    
                    if (uploaded) {
                        user.Avatar = path
                        user.Updated_At = CurrentTimestamp()

                        await user.save()

                        return await HttpResponder({
                            c,
                            success: true,
                            message: 'avatar-was-updated-successfully',
                            data: null,
                            code: 200
                        })
                    }
    
                    else return await HttpResponder({
                        c,
                        success: false,
                        message: 'avatar-was-not-uploaded-because-of-an-error',
                        data: null,
                        code: 500
                    })
                }
                
                else return await HttpResponder({
                    c,
                    success: false,
                    message: 'avatar-was-not-deleted-because-of-an-error',
                    data: null,
                    code: 500
                })
            }

            else {
                const deletePreviousAvatar = await DeleteFile(path, CLOUDFLARE_CDN_BUCKET)

                if (deletePreviousAvatar) {
                    user.Avatar = null
                    await user.save()

                    return await HttpResponder({
                        c,
                        success: true,
                        message: 'avatar-was-updated-successfully',
                        data: null,
                        code: 200
                    })
                }

                else return await HttpResponder({
                    c,
                    success: false,
                    message: 'avatar-was-not-deleted-because-of-an-error',
                    data: null,
                    code: 500
                })
            }
        } 
        
        else return await HttpResponder({
            c,
            success: false,
            message: 'user-was-not-found-or-is-not-authenticated-to-update-avatar',
            data: null,
            code: 404
        })
    } 
    
    catch (error) {
        Console.Error('UpdateAvatar', error)

        return await HttpResponder({
            c,
            success: false,
            message: 'an-error-occurred-while-updating-avatar',
            data: null,
            code: 500
        })
    }
}

export default UpdateAvatar