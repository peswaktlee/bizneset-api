
import type { Model } from 'mongoose'

import { UploadToBucket } from '@/helpers/libs/cloudflare'
import { GenerateUniqueFileId } from '@/helpers/generals'
import { CLOUDFLARE_BUCKETS } from '@/data/constants'

const Backup = async <T extends object>(model: Model<T>, key: string) => {
    const Model = model
    const Items = []
    const chunkSize = 1000

    const itemLength = await Model.countDocuments()
    
    while (itemLength > Items.length) {
        const items = await Model
            .find()
            .skip(Items.length)
            .limit(chunkSize)
            .lean() as Array<T>

        for (const i of items) {
            const itm = {
                ...i
            }

            if ('_id' in itm) {
                const _id = {
                    // @ts-expect-error _id is a string
                    '$oid': i._id?.toString()
                }

                itm._id = _id
            }

            if ('User' in itm) {
                const User = {
                    // @ts-expect-error User is a string
                    '$oid': i.User?.toString()
                }

                itm.User = User
            }

            if ('Post' in itm) {
                const Post = {
                    // @ts-expect-error Post is a string
                    '$oid': i.Post?.toString()
                }

                itm.Post = Post
            }

            if ('Country' in itm && itm?.Country) {
                const Country = {
                    // @ts-expect-error Country is a string
                    '$oid': i.Country?.toString()
                }
    
                itm.Country = Country
            }

            if ('City' in itm && itm?.City) {
                const City = {
                    // @ts-expect-error City is a string
                    '$oid': i.City?.toString()
                }
    
                itm.City = City
            }

            if ('Created_At' in itm) {
                const Created_At = {
                    // @ts-expect-error Created_At is a string
                    '$date': i.Created_At
                }

                itm.Created_At = Created_At
            }

            if ('Last_Active' in itm) {
                const Last_Active = {
                    // @ts-expect-error Last_Active is a string
                    '$date': i.Last_Active
                }

                itm.Last_Active = Last_Active
            }

            if ('Expires_At' in itm) {
                const Expires_At = {
                    // @ts-expect-error Expires_At is a string
                    '$date': i.Expires_At
                }

                itm.Expires_At = Expires_At
            }

            if ('Occurred_At' in itm) {
                const Occurred_At = {
                    // @ts-expect-error Occurred_At is a string
                    '$date': i.Occurred_At
                }

                itm.Occurred_At = Occurred_At
            }

            if ('Updated_At' in itm) {
                const Updated_At = {
                    // @ts-expect-error Updated_At is a string
                    '$date': i.Updated_At
                }

                itm.Updated_At = Updated_At
            }

            if ('Sent_At' in itm) {
                const Sent_At = {
                    // @ts-expect-error Sent-At is a string
                    '$date': i.Sent_At
                }

                itm.Sent_At = Sent_At
            }

            if ('Deleted_At' in itm) {
                const Deleted_At = {
                    // @ts-expect-error Deleted_At is a string
                    '$date': i.Deleted_At
                }

                itm.Deleted_At = Deleted_At
            }

            if ('Read_At' in itm) {
                const Read_At = {
                    // @ts-expect-error Read_At is a string
                    '$date': i.Read_At
                }

                itm.Read_At = Read_At
            }

            if ('Generated_At' in itm) {
                const Generated_At = {
                    // @ts-expect-error Generated_At is a string
                    '$date': i.Generated_At
                }

                itm.Generated_At = Generated_At
            }

            Items.push(itm)
        }
    }

    const fileBuffer = Buffer.from(JSON.stringify(Items))
    const fileId = GenerateUniqueFileId()

    await UploadToBucket({
        bucket: CLOUDFLARE_BUCKETS.BACKUPS,
        path: `db/${key}/${fileId}.json`,
        file: fileBuffer,
        type: 'application/json',
        publicObject: false
    })
}

export default Backup