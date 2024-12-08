import type { Context } from 'hono'
import type { LanguagesTypes } from '@/ts'

import { HEADER_KEYS, LanguagesList } from '@/data/constants'

const ApiLanguage = (c: Context): LanguagesTypes | null => {
    const api_language = c.req.header(HEADER_KEYS.LANGUAGE)
    const language = LanguagesList.find((v) => v.language === api_language)

    if (language) return language.language
    else return null
}

export default ApiLanguage