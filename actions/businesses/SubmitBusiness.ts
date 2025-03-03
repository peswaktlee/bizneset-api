import type { Context } from 'hono'

import sharp from 'sharp'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { CurrentTimestamp } from '@/helpers/dates'
import { ObjectId } from '@/helpers/libs/mongo'
import { GenerateBusinessSlug } from '@/helpers/generals'
import { UploadToBucket } from '@/helpers/libs/cloudflare'

import { 
    CategoryValidation, 
    EmailValidation, 
    GalleryValidation, 
    LinksValidation, 
    LogoValidation, 
    PhoneValidation, 
    StringValidation, 
    WebsiteValidation 
} from '@/helpers/validations'

import { 
    BUSINESS_STATUSES, 
    CLOUDFLARE_CDN_BUCKET,
    CLOUDFLARE_CDN_PATHS, 
    CONTEXT_KEYS, 
    FILE_EXTENSIONS 
} from '@/data/constants'

const SubmitBusiness = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const hasOnPending = await BusinessModel.exists({ 
                User: user?._id, 
                Status: BUSINESS_STATUSES.PENDING
            })

            if (!hasOnPending) {
                const { 
                    title, 
                    description,
                    website,
                    category,
                    phone,
                    email,
                    logo,
                    gallery,
                    links,
                    locations
                } = await DecodeBody(c)

                const titleValidation = StringValidation({
                    value: title || '',
                    min: 2,
                    max: 99,
                    noNumbers: false,
                    noSpecialCharacters: true,
                    entityTranslation: 'title'
                })

                const descriptionValidation = StringValidation({
                    value: description || '',
                    min: 2,
                    max: 99,
                    noNumbers: false,
                    noSpecialCharacters: false,
                    entityTranslation: 'description'
                })

                const locationsFormatted = locations?.slice(0, 10)
                const linksFormatted = links?.slice(0, 10)

                const categoryValidation = await CategoryValidation(category)
                const emailValidation = EmailValidation(email, true)
                const phoneValidation = PhoneValidation(phone, true)
                const websiteValidation = WebsiteValidation(website, true)
                const logoValidation = LogoValidation(logo?.Media)
                const galleryValidation = GalleryValidation(gallery)
                const linksValidation = LinksValidation(linksFormatted)

                const isValid = 
                    !titleValidation.error && 
                    !descriptionValidation.error &&
                    !categoryValidation.error &&
                    !emailValidation.error &&
                    !phoneValidation.error &&
                    !websiteValidation.error &&
                    !logoValidation.error &&
                    !galleryValidation.error &&
                    !linksValidation.error

                if (isValid) {
                    const slug = await GenerateBusinessSlug(title)
                    const galleryPhotos = []
    
                    for (const photo of gallery) if (photo?.Media) {
                        galleryPhotos.push(photo)
                    }
    
                    const business = new BusinessModel({ 
                        Title: title,
                        Description: description,
                        Slug: slug,
                        Gallery: [],
                        Logo: null,
                        Category: category,
                        User: ObjectId(user?._id),
                        Links: linksFormatted,
                        Website: website,
                        Phone: phone,
                        Email: email,
                        Locations: locationsFormatted,
                        Created_At: CurrentTimestamp()
                    })
    
                    await business.save()
    
                    if (logo) {
                        let base64 = logo?.Media
                        const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    
                        if (matches && matches.length === 3) base64 = matches[2]
                        const base64buffer = Buffer.from(base64, 'base64')
    
                        const base64pro = await sharp(base64buffer)
                            .webp({ quality: 100 })
                            .toBuffer()
    
                        const pathLogo = `${CLOUDFLARE_CDN_PATHS.BUSINESSES}/${business?._id}/logo.${FILE_EXTENSIONS.WEBP}`
    
                        const upload = await UploadToBucket({
                            bucket: CLOUDFLARE_CDN_BUCKET,
                            path: pathLogo,
                            file: base64pro,
                            type: FILE_EXTENSIONS.WEBP,
                            publicObject: false
                        })
    
                        if (upload) {
                            const newLogoObject = logo
                            newLogoObject.Media = null
                            
                            business.Logo = newLogoObject
                            
                        }
    
                        else business.Logo = null
                    }
    
                    if (gallery?.length > 0) {
                        let index = 0
                        
                        for (const photo of gallery) {
                            let base64 = photo?.Media
                            const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    
                            if (matches && matches.length === 3) base64 = matches[2]
                            const base64buffer = Buffer.from(base64, 'base64')
    
                            const base64pro = await sharp(base64buffer)
                                .webp({ quality: 100 })
                                .toBuffer()
    
                            const pathPhoto = `${CLOUDFLARE_CDN_PATHS.BUSINESSES}/${business?._id}/${index + 1}.${FILE_EXTENSIONS.WEBP}`
                            
                            const upload = await UploadToBucket({
                                bucket: CLOUDFLARE_CDN_BUCKET,
                                path: pathPhoto,
                                file: base64pro,
                                type: FILE_EXTENSIONS.WEBP,
                                publicObject: false
                            })
        
                            if (upload) {
                                const newPhotoObject = photo
                                newPhotoObject.Media = null
    
                                business.Gallery[index] = newPhotoObject
                            }
    
                            index++
                        }
                    }
    
                    await business.save()
    
                    user.Businesses = user.Businesses + 1
                    user.HasPendingBusinessSubmission = true
                    user.Updated_At = CurrentTimestamp()
    
                    await user.save()
    
                    return await HttpResponder({
                        c,
                        success: true,
                        code: 200,
                        message: 'business-was-submited-successfully',
                        data: business
                    })
                }

                else return await HttpResponder({
                    c,
                    success: false,
                    code: 400,
                    data: {
                        title: titleValidation,
                        description: descriptionValidation,
                        category: categoryValidation,
                        email: emailValidation,
                        phone: phoneValidation,
                        website: websiteValidation,
                        logo: logoValidation,
                        gallery: galleryValidation,
                        links: linksValidation
                    },
                    message: 'business-was-not-submited-because-of-validation-errors'
                })
            }

            else return await HttpResponder({
                c,
                success: false,
                code: 400,
                data: null,
                message: 'you-cannot-create-a-new-business-because-you-have-a-pending-one'
            })
        }

        else return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'business-was-not-submited-because-of-a-problem'
        })
    }

    catch (error) {
        Console.Error('SubmitBusiness', error)

        return await HttpResponder({
            c,
            success: false,
            code: 500,
            data: null,
            message: 'business-was-not-submited-for-posting-because-of-a-problem'
        })
    }
}

export default SubmitBusiness