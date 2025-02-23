import type { CSSProperties, ReactNode, MouseEvent, FC } from 'react'
import type { CategoryInterface, CityInterface, CountryInterface } from '@/ts'
import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import type { METHODS } from 'http'

import { sq_AL } from '@/data/langs'

import { 
    API_VERSIONS, 
    BUSINESS_STATUSES, 
    LANGUAGES, 
    LOG_TYPES, 
    USER_ROLES 
} from '@/data/constants'

export type TranslationKeys = keyof typeof sq_AL
export type TranslationTypes = typeof sq_AL

export type UserRoleTypes = (typeof USER_ROLES)[keyof typeof USER_ROLES]
export type HttpMethodTypes = (typeof METHODS)[keyof typeof METHODS]
export type LogTypes = (typeof LOG_TYPES)[keyof typeof LOG_TYPES]
export type LanguagesTypes = (typeof LANGUAGES)[keyof typeof LANGUAGES]
export type ApiVersionsTypes = (typeof API_VERSIONS)[keyof typeof API_VERSIONS]
export type BusinessStatusTypes = (typeof BUSINESS_STATUSES)[keyof typeof BUSINESS_STATUSES]

export type RouterPathFunctionType = (path: string) => void

export type RequestFunctionProps = {
    path: string
    method: HttpMethodTypes
    signal?: AbortSignal
    body?: Record<string, unknown>
}

export type RequestType = {
    method: HttpMethodTypes,
    headers: Record<string, string>
    body?: string
    signal?: AbortSignal
}

export type RequestProFunctionProps = {
    path: string
    method: HttpMethodTypes
    body?: Record<string, unknown>
}

export type MetaTagsTypes = {
    title?: TranslationKeys | undefined | string
    index?: boolean
}

export type RootLayout = {
    children: React.ReactNode
}

export type NormalLayoutTypes = {
    children: ReactNode
}

export type IconComponentProps = {
    size?: string
    className?: string
}

export type ButtonComponentProps = {
    children?: ReactNode | string
    className?: string
    disabled?: boolean
    target?: '_blank'
    iconClassName?: string | undefined
    href?: string | undefined
    element?: 'button' | 'span'
    loading?: boolean
    icon?: ReactNode
    onClick?: Function | undefined
    style?: CSSProperties
    download?: boolean
    type: 'primary' | 'secondary' | 'action'
    onEnter?: Function | undefined
    id?: string | null
}

export type UserDropdownListItemType = {
    href: string,
    name: TranslationKeys,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => void
    isActive: boolean
    onlyAdmin: boolean
    icon: ReactNode
}

export type StatesType = {
    CATEGORIES: null | Array<CategoryInterface>
    CITIES: null | Array<CityInterface>
    COUNTRIES: null | Array<CountryInterface>
}

export type ValidationReturnType = {
    message: string
    error: boolean
}

export type HttpResponderFunctionProps = {
    c: Context
    success: boolean
    message: TranslationKeys
    data: null | Array<object> | object | string | boolean
    code: StatusCode
    encode?: boolean
}

export type ApiVersionTypes = {
    version: ApiVersionsTypes
    path: string
}

export type LanguageTypes = {
    language: LanguagesTypes
    path: string
}

export type RequestResponseTypes = {
    success: boolean
    message: string
    data: null | Array<object> | object | string | boolean
    code: number
    version: string
}

export type RequestOptions = {
    Language: LanguagesTypes | null
    Version: ApiVersionsTypes | null
}

export type UploadToBucketFunctionProps = {
    bucket: string
    path: string
    file: Buffer
    type: string
    publicObject: boolean
}

export type SendEmailFunctionProps = {
    subject: string,
    from?: string,
    template: ReactNode
} & (
    | { toEmail: string; toEmails?: never }
    | { toEmail?: never; toEmails: Array<string> }
)

export type RegisterUserFunctionProps = {
    c: Context, 
    uid: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    avatar: string
}

export type UploadToBucketSizeType = {
    status: boolean
    path: string | null
    size: number
}

export type OnWelcomeEmailProps = {
    subject: string
    userName: string
}

export type OnBusinessViewsProps = {
    subject: string
    views: string
    userName: string
    businessName: string
    businessLink: string
}

export type OnBusinessApprovalProps = {
    subject: string
    userName: string
    businessName: string 
    businessLink: string
}

export type OnBusinessRejectionProps = {
    subject: string
    userName: string
    businessName: string 
    businessLink: string
    reasonOfRejection: string
}