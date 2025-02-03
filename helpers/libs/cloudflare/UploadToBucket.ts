import type { UploadToBucketFunctionProps, UploadToBucketSizeType } from '@/ts'

import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { R2Client, CheckBucket, CreateBucket } from '@/helpers/libs/cloudflare'
import { Console } from '@/helpers/logs'

const UploadToBucket = async (props: UploadToBucketFunctionProps): Promise<UploadToBucketSizeType> => {
    try {
        const {
            bucket,
            path,
            file,
            type,
            publicObject
        } = props

        const exists = await CheckBucket(bucket)

        if (exists) {
            const command = {
                Bucket: bucket,
                Key: path,
                Body: file,
                ContentType: type
            }

            if (publicObject) {
                // @ts-expect-error ACL is not defined in PutObjectCommand
                command.ACL = 'public-read'
            }

            const data = await R2Client.send(new PutObjectCommand(command))
    
            if (data?.$metadata?.httpStatusCode === 200) {
                const headData = await R2Client.send(new HeadObjectCommand({
                    Bucket: bucket,
                    Key: path
                }))
    
                const fileSize = headData.ContentLength

                return { 
                    status: true,
                    size: fileSize || 0,
                    path
                }
            }

            else return {
                status: false,
                size: 0,
                path
            }
        }

        else {
            const is_created = await CreateBucket(bucket)

            if (is_created) {
                const data = await R2Client.send(new PutObjectCommand({
                    Bucket: bucket,
                    Key: path,
                    Body: file,
                    ContentType: type
                }))
        
                const status = data?.$metadata?.httpStatusCode === 200

                return {
                    status,
                    size: status ? (typeof file === 'string' ? 0 : file?.byteLength) : 0,
                    path
                }
            }

            else return {
                status: false,
                path,
                size: 0
            }
        }
    }

    catch (error) {
        Console.Error('UploadToBucket', error)

        return {
            status: false,
            path: null,
            size: 0
        }
    }
}

export default UploadToBucket