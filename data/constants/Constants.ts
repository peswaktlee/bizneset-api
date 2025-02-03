export const FETCH_LIMIT = 10
export const SIMILAR_BUSINESSES_FETCH_LIMIT = 8

export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
}

export const CDN_BUCKETS = {
    AVATARS: 'avatars'
}

export const MODELS = {
    BUSINESS: 'Business',
    CATEGORY: 'Category',
    CITY: 'City',
    COUNTRY: 'Country',
    LOG: 'Log',
    USER: 'User',
    USER_SAVE: 'UserSave',
    BACKUP: 'Backup'
}

export const LOG_TYPES = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning'
}

export const GROUP_ROUTES = {
    BUSINESSES: 'businesses',
    CATEGORIES: 'categories',
    CITIES: 'cities',
    COUNTRIES: 'countries',
    LOGS: 'logs',
    USERS: 'users',
    CRONS: 'crons',
    SAVES: 'saves'
}

export const LOGS_ROUTES = {
    INSERT_LOG: '/insert'
}

export const USER_ROUTES = {
    AUTH_USER: '/auth'
}

export const LANGUAGES = {
    ALBANIAN: 'sq_AL'
}

export const API_VERSIONS = {
    V1: '1'
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
    CREATE_CATEGORY: '/create',
    LIST_CATEGORIES: '/list'
}

export const HEADER_KEYS = {
    AUTHORIZATION: 'Authorization',
    LANGUAGE: 'Api-Language',
    VERSION: 'Api-Version',
    STRIPE_SIGNATURE: 'Stripe-Signature'
}

export const USERS_ROUTES = {
    AUTH_USER: '/auth',
    UPDATE_AVATAR: '/avatar',
    UPDATE_USER: '/update'
}

export const CITIES_ROUTES = {
    CREATE_CITY: '/create',
    LIST_CITIES: '/list'
}

export const COUNTRIES_ROUTES = {
    CREATE_COUNTRY: '/create',
    LIST_COUNTRIES: '/list'
}

export const SAVES_ROUTES = {
    LIST_SAVES: '/list',
    HANDLE_SAVE: '/handle'
}

export const CRONS_ROUTES = {
    GENERATE_BACKUP: '/generate-backup'
}

export const BUSINESSES_ROUTES = {
    SUBMIT_BUSINESS: '/submit',
    DELETE_BUSINESS: '/delete',
    LIST_BUSINESSES: '/list',
    VIEW_BUSINESS: '/view',
    LIST_USER_BUSINESSES: '/user-list',
    LIST_SIMILAR_BUSINESSES: '/similar-list'
}

export const FILE_EXTENSIONS = {
    WEBP: 'webp',
    JSON: 'json'
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
    REJECTED: 'rejected',
    DELETED: 'deleted'
}