import type {
    ApiVersionTypes,
    ApiVersionsTypes,
    LanguageTypes,
    LanguagesTypes
} from '@/ts'

import { API_VERSIONS, LANGUAGES } from '@/data/constants'

export const ApiVersionsList: Array<ApiVersionTypes> = [
    {
        version: API_VERSIONS.V1 as ApiVersionsTypes,
        path: 'controllers/actions/v1'
    }
]

export const LanguagesList: Array<LanguageTypes> = [
    {
        language: LANGUAGES.ALBANIAN as LanguagesTypes,
        path: 'data/langs/sq_AL'
    }
]