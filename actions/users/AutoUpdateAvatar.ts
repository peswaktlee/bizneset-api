import sharp from 'sharp'

import { Console } from '@/helpers/logs'
import { DeleteFile, UploadToBucket } from '@/helpers/libs/cloudflare'
import { CDN_BUCKETS, CLOUDFLARE_CDN_BUCKET, FILE_EXTENSIONS } from '@/data/constants'

const AutoUpdateAvatar = async (avatarUrl: string, userId: string): Promise<boolean> => {
    try {
        const fetchImage = await fetch(avatarUrl)
        const blob = await fetchImage.blob()
    
        if (blob) {
            const path = `${CDN_BUCKETS.AVATARS}/${userId}.${FILE_EXTENSIONS.WEBP}`
            await DeleteFile(path, CLOUDFLARE_CDN_BUCKET)

            const blobToBuffer = await new Response(blob).arrayBuffer()
            
            const base64webp = await sharp(blobToBuffer)
                .resize(250, 250)
                .webp({ quality: 100 })
                .toBuffer()

            if (base64webp) {
                const upload = await UploadToBucket({
                    bucket: CLOUDFLARE_CDN_BUCKET,
                    path: path,
                    file: base64webp,
                    type: FILE_EXTENSIONS.WEBP,
                    publicObject: true
                })
    
                if (upload) return true
                else return false
            }

            else return false
        }
        

        else return false
    }

    catch (error) {
        Console.Error('AutoUpdateAvatar', error)
        return false
    }
}

export default AutoUpdateAvatar