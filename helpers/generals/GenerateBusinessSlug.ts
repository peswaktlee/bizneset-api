import { BusinessModel } from '@/data/models'

const GenerateBusinessSlug = async (title: string): Promise<string> => {
    let slug = title.toLowerCase().replace(/ /g, '-')

    slug = slug.replace(/[^a-zA-Z-]/g, '')
    slug = slug.replace(/[0-9]/g, '')

    const business = await BusinessModel.exists({ Slug: slug })

    if (business) return GenerateBusinessSlug(slug + Math.random()?.toString().substring(2, 5))
    else return slug
}

export default GenerateBusinessSlug