import type { Context } from 'hono'

import { DecodeBody, HttpResponder } from '@/helpers/http'
import { Console } from '@/helpers/logs'
import { BusinessModel } from '@/data/models'
import { CurrentTimestamp } from '@/helpers/dates'
import { ObjectId } from '@/helpers/libs/mongo'
import { BUSINESS_STATUSES, CONTEXT_KEYS } from '@/data/constants'

const SubmitBusiness = async (c: Context) => {
    try {
        const user = c.get(CONTEXT_KEYS.USER)

        if (user) {
            const hasOnPending = BusinessModel.exists({ 
                User: user?._id, 
                Status: BUSINESS_STATUSES.PENDING
            })

            if (!hasOnPending) {
                // const slug = await GenerateUniqueSlug()
                const slug = Math.random()

                const { 
                    name, 
                    image, 
                    gallery 
                } = await DecodeBody(c)

                const business = new BusinessModel({ 
                    Name: name,
                    Slug: slug,
                    Gallery: gallery,
                    Image: image,
                    User: ObjectId(user._id),
                    Created_At: CurrentTimestamp()
                })

                await business.save()

                user.Businesses = user.ProjectCount + 1
                user.Updated_At = CurrentTimestamp()

                await user.save()

                return await HttpResponder({
                    c,
                    success: true,
                    code: 200,
                    message: 'business-was-submited-successfully',
                    data: {
                        business: business,
                        businessCount: user.ProjectCount + 1
                    }
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