import type { UploadToBucketSizeType } from '@/ts'

import { UploadToBucket } from '@/helpers/libs/cloudflare'
import { CLOUDFLARE_BACKUP_BUCKET } from '@/data/constants/Envs'
import { FILE_EXTENSIONS } from '@/data/constants'

const Backup = async (name: string, date: string, data: Array<Record<string, unknown>>): Promise<UploadToBucketSizeType> => {
    const items = []

    for (const i of data) {
        const itm = {
            ...i
        }

        if ('_id' in itm) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm._id = _id
        }

        if ('User' in itm && i?.User) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.User = _id
        }

        if ('Category' in itm && i?.Category) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Category = _id
        }

        if ('Style' in itm && i?.Style) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Style = _id
        }

        if ('DesignSystem' in itm && i?.DesignSystem) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.DesignSystem = _id
        }

        if ('Project' in itm && i?.Project) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Project = _id
        }

        if ('Project' in itm && i?.Project) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Project = _id
        }

        if ('Reference' in itm && i?.Reference) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Reference = _id
        }

        if ('Settings' in itm && i?.Settings) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Settings = _id
        }

        if ('Subscription' in itm && i?.Subscription) {
            const _id = {
                '$oid': i._id?.toString()
            }

            itm.Subcription = _id
        }

        if ('FromDate' in itm) {
            const Date = {
                '$date': i.FromDate
            }

            itm.FromDate = Date
        }

        if ('ToDate' in itm) {
            const Date = {
                '$date': i.ToDate
            }

            itm.ToDate = Date
        }

        if ('Generated_At' in itm) {
            const Date = {
                '$date': i.Generated_At
            }

            itm.Generated_At = Date
        }

        if ('Created_At' in itm) {
            const Date = {
                '$date': i.Created_At
            }

            itm.Created_At = Date
        }

        if ('Updated_At' in itm) {
            const Date = {
                '$date': i.Updated_At
            }

            itm.Updated_At = Date
        }

        if ('Joined_At' in itm) {
            const Date = {
                '$date': i.Joined_At
            }

            itm.Joined_At = Date
        }

        if ('Occurred_At' in itm) {
            const Date = {
                '$date': i.Occurred_At
            }

            itm.Occurred_At = Date
        }

        if ('StartDate' in itm) {
            const Date = {
                '$date': i.StartDate
            }

            itm.StartDate = Date
        }

        if ('EndDate' in itm) {
            const Date = {
                '$date': i.EndDate
            }

            itm.EndDate = Date
        }

        items.push(itm)
    }

    const upload = await UploadToBucket({
        bucket: CLOUDFLARE_BACKUP_BUCKET,
        path: `${name}/${Math.random().toString(36).substring(2, 6)}-${date}.${FILE_EXTENSIONS.JSON}`,
        file: Buffer.from(JSON.stringify(items)),
        type: FILE_EXTENSIONS.JSON,
        publicObject: false
    })

    return upload
}

export default Backup