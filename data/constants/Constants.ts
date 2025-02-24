import { CLOUDFLARE_CDN_DOMAIN, FULL_HOST, LINKS_URL } from '@/data/constants/Envs'

export const DELETE_REJECTED_AFTER_DAYS = 30

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
}

export const CDN_BUCKETS = {
    AVATARS: 'avatars',
    ASSETS: 'assets'
}

export const MODELS = {
    BUSINESS: 'Business',
    CATEGORY: 'Category',
    LOG: 'Log',
    USER: 'User',
    USER_SAVE: 'User-Save',
    BACKUP: 'Backup',
    ANALYTIC: 'Analytic'
}

export const MODELS_BACKUPS_NAMES = {
    BUSINESSES: 'businesses',
    CATEGORIES: 'categories',
    LOGS: 'logs',
    USERS: 'users',
    USER_SAVES: 'user-saves',
    BACKUPS: 'backups',
    ANALYTICS: 'analytics'
}

export const LOG_TYPES = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
}

export const GROUP_ROUTES = {
    BUSINESSES: 'businesses',
    CATEGORIES: 'categories',
    GENERALS: 'generals',
    USERS: 'users',
    CRONS: 'crons',
    SAVES: 'saves'
}

export const LANGUAGES = {
    ALBANIAN: 'sq_AL'
}

export const API_VERSIONS = {
    V1: '1'
}

export const METHODS = {
    POST: 'POST',
    GET: 'GET'
}

export const ENVIRONMENTS = {
    DEV: 'dev',
    PROD: 'prod'
}

export const CLOUDFLARE_BUCKETS = {
    CDN: 'cdn',
    BACKUPS: 'backups'
}

export const CONTEXT_KEYS = {
    UID: 'uid',
    USER: 'user',
    ADMIN: 'admin'
}

export const CATEGORIES_ROUTES = {
    CREATE_CATEGORY: '/create-category',
    LIST_CATEGORIES: '/list-categories',
    LIST_STATIC_CATEGORIES: '/list-static-categories',
    LIST_STATIC_CATEGORY: '/list-static-category'
}

export const HEADER_KEYS = {
    AUTHORIZATION: 'Authorization',
    LANGUAGE: 'Api-Language',
    VERSION: 'Api-Version',
    STRIPE_SIGNATURE: 'Stripe-Signature'
}

export const USERS_ROUTES = {
    AUTH_USER: '/auth-user',
    UPDATE_AVATAR: '/avatar-user',
    UPDATE_USER: '/update-user',
    CLOSE_ACCOUNT: '/close-account'
}

export const SAVES_ROUTES = {
    LIST_SAVES: '/list-user-saves',
    HANDLE_SAVE: '/handle-save'
}

export const CRONS_ROUTES = {
    GENERATE_BACKUP: '/generate-backup',
    PERFORM_CLEANUP: '/perform-cleanup'
}

export const BUSINESSES_ROUTES = {
    SUBMIT_BUSINESS: '/submit-business',
    DELETE_BUSINESS: '/delete-business',
    LIST_BUSINESSES: '/list-businesses',
    VIEW_BUSINESS: '/view-business',
    VIEW_BUSINESS_EDIT: '/view-business-edit',
    LIST_USER_BUSINESSES: '/list-user-businesses',
    LIST_SIMILAR_BUSINESSES: '/list-similar-businesses',
    APPROVE_BUSINESS: '/approve-business',
    REJECT_BUSINESS: '/reject-business',
    LIST_ADMIN_BUSINESSES: '/list-admin-businesses',
    LIST_STATIC_BUSINESSES: '/list-static-businesses',
    LIST_STATIC_BUSINESS: '/list-static-business'
}

export const FILE_EXTENSIONS = {
    WEBP: 'webp',
    JSON: 'json',
    PNG: 'png'
}

export const FILE_TYPES = {
    IMAGE: {
        WEBP: 'image/webp'
    }
}

export const CLOUDFLARE_CDN_PATHS = {
    AVATARS: 'avatars',
    BUSINESSES: 'businesses'
}

export const BUSINESS_STATUSES = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
}

export const GALLERY_NUMBER_ITEMS = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
]

export const GENERALS_ROUTES = {
    LIST_ANALYTICS: '/list-analytics',
    CREATE_LOG: '/create-log'
}

export const CONSOLE_LOG_HEADERS = {
    'Content-Type': 'application/json',
    'Api-Version': API_VERSIONS.V1,
    'Api-Language': LANGUAGES.ALBANIAN
}

export const FETCH_LIMIT = 10
export const SIMILAR_BUSINESSES_FETCH_LIMIT = 8
export const CONSOLE_LOG_URL = `${FULL_HOST}/${GROUP_ROUTES.GENERALS}${GENERALS_ROUTES.CREATE_LOG}`

export const SIMILAR_BUSINESSES_SORTS: Array<Record<string, number>> = [
    { Created_At: 1 },
    { Created_At: -1 },
    { Reach: 1 },
    { Reach: -1 },
    { Name: 1 },
    { Name: -1 },
    { Slug: 1 },
    { Slug: -1 },
    { Updated_At: 1 },
    { Updated_At: -1 }
]

export const SOCIAL_MEDIAS = {
    FACEBOOK: `${LINKS_URL}/bizneset-facebook`,
    INSTAGRAM: `${LINKS_URL}/bizneset-instagram`,
    LINKEDIN: `${LINKS_URL}/bizneset-linkedin`,
    YOUTUBE: `${LINKS_URL}/bizneset-youtube`
}

export const ASSETS = {
    LOGO_BLACK_FULL: `${CLOUDFLARE_CDN_DOMAIN}/${CDN_BUCKETS.ASSETS}/bizneset-logo-dark.${FILE_EXTENSIONS.PNG}`,
    SOCIAL_MEDIA_ICON_LINKEDIN: `${CLOUDFLARE_CDN_DOMAIN}/${CDN_BUCKETS.ASSETS}/linkedin-social-icon.${FILE_EXTENSIONS.PNG}`,
    SOCIAL_MEDIA_ICON_YOUTUBE: `${CLOUDFLARE_CDN_DOMAIN}/${CDN_BUCKETS.ASSETS}/youtube-social-icon.${FILE_EXTENSIONS.PNG}`,
    SOCIAL_MEDIA_ICON_INSTAGRAM: `${CLOUDFLARE_CDN_DOMAIN}/${CDN_BUCKETS.ASSETS}/instagram-social-icon.${FILE_EXTENSIONS.PNG}`,
    SOCIAL_MEDIA_ICON_FACEBOOK: `${CLOUDFLARE_CDN_DOMAIN}/${CDN_BUCKETS.ASSETS}/facebook-social-icon.${FILE_EXTENSIONS.PNG}`
}

export const VIEWS_FOR_EMAIL = {
    K: 1000,
    KK: 10000,
    KKK: 100000,
    KKKK: 1000000
}

export const VIEWS_WITH_COMMA_EMAIL = {
    K: '1,000',
    KK: '10,000',
    KKK: '100,100',
    KKKK: '1,000,000'
}