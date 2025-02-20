import type { Context } from 'hono'

import { BusinessModel, SaveModel, UserModel } from '@/data/models'
import { DecodeBody, HttpResponder } from '@/helpers/http'
import { ObjectId } from '@/helpers/libs/mongo'
import { Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'
import { DeleteFile } from '@/helpers/libs/cloudflare'

import { 
    BUSINESS_STATUSES,
    CLOUDFLARE_BUCKETS, 
    CLOUDFLARE_CDN_PATHS, 
    CONTEXT_KEYS, 
    FILE_EXTENSIONS, 
    GALLERY_NUMBER_ITEMS 
} from '@/data/constants'

const DeleteBusiness = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const { businessId } = await DecodeBody(c)

            const filter = { 
                _id: ObjectId(businessId),
                User: ObjectId(user?._id)
            }

            const business = await BusinessModel.findOne(filter)

            if (!business) return await HttpResponder({
                c,
                success: false,
                code: 404,
                data: null,
                message: 'business-was-not-found'
            })

            else {
                let data = null
                const isDeletedBusinessPending = business.Status === BUSINESS_STATUSES.PENDING

                await business.deleteOne()

                user.Businesses = user.Businesses - 1
                user.DeletedBusinesses = user.DeletedBusinesses + 1

                if (isDeletedBusinessPending) {
                    const hasPendingBusinesses = await BusinessModel.exists({ 
                        User: ObjectId(user?._id),
                        Status: BUSINESS_STATUSES.PENDING
                    })

                    if (!hasPendingBusinesses) {
                        user.HasPendingBusinessSubmission = false

                        data = {
                            HasPendingBusinessSubmission: false
                        }
                    }
                }

                user.Updated_At = CurrentTimestamp()

                await user.save()

                const saves = await SaveModel.find({ Business: ObjectId(businessId) })

                for (const save of saves) {
                    await save.deleteOne()

                    await UserModel.updateOne(
                        {
                            _id: ObjectId(user?._id) 
                        }, 
                        { 
                            $inc: { 
                                Saves: -1
                            },
                            $set: {
                                Updated_At: CurrentTimestamp()
                            }
                        }
                    )
                }
                
                for (const path of GALLERY_NUMBER_ITEMS) {
                    const pathString = `${CLOUDFLARE_CDN_PATHS.BUSINESSES}/${business?._id}/${path}.${FILE_EXTENSIONS.WEBP}`
                    await DeleteFile(pathString, CLOUDFLARE_BUCKETS.CDN)
                }

                const pathLogo = `${CLOUDFLARE_CDN_PATHS.BUSINESSES}/${business?._id}/logo.${FILE_EXTENSIONS.WEBP}`
                await DeleteFile(pathLogo, CLOUDFLARE_BUCKETS.CDN)

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-was-deleted-successfully',
                    data
                })
            }
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 404,
            data: null,
            message: 'user-was-not-found-or-is-not-authorized-to-delete-this-business'
        })
    }

    catch (error) {
        Console.Error('DeleteBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'something-went-wrong-while-deleting-the-business'
        })
    }
}

export default DeleteBusiness