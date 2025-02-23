import type { BusinessInterface, UserInterface } from '@/ts'

import { BusinessModel, SaveModel, UserModel } from '@/data/models'
import { ObjectId } from '@/helpers/libs/mongo'
import { Analytics, Console } from '@/helpers/logs'
import { CurrentTimestamp } from '@/helpers/dates'
import { DeleteFile } from '@/helpers/libs/cloudflare'

import { 
    BUSINESS_STATUSES,
    CLOUDFLARE_BUCKETS, 
    CLOUDFLARE_CDN_PATHS, 
    FILE_EXTENSIONS, 
    GALLERY_NUMBER_ITEMS 
} from '@/data/constants'

const HandleDeletion = async (business: BusinessInterface, user: UserInterface) => {
    try {
        let data = null
        
        const businessId = business?._id.toString()
        const isDeletedBusinessPending = business.Status === BUSINESS_STATUSES.PENDING

        // @ts-ignore
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

        // @ts-ignore
        await user.save()

        const saves = await SaveModel.find({ Business: ObjectId(businessId) })
        let deletedSaves = 0

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

            deletedSaves += 1
        }

        await Analytics.IncreaseDecreaseBulk({
            TotalBusinessSaves: -deletedSaves,
            TotalBusinesses: -1
        })
                
        for (const path of GALLERY_NUMBER_ITEMS) {
            try {
                const pathString = `${CLOUDFLARE_CDN_PATHS.BUSINESSES}/${business?._id}/${path}.${FILE_EXTENSIONS.WEBP}`
                await DeleteFile(pathString, CLOUDFLARE_BUCKETS.CDN)
            }

            catch (_) {}
        }

        try {
            const pathLogo = `${CLOUDFLARE_CDN_PATHS.BUSINESSES}/${business?._id}/logo.${FILE_EXTENSIONS.WEBP}`
            await DeleteFile(pathLogo, CLOUDFLARE_BUCKETS.CDN)
        }

        catch (_) {}

        return data
    }

    catch (error) {
        Console.Error('HandleDeletion', error)
        return false
    }
}

export default HandleDeletion