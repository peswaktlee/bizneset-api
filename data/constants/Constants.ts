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
    USER_SAVE: 'User-Save',
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
    CREATE_LOG: '/create-log'
}

export const USER_ROUTES = {
    AUTH_USER: '/auth-user'
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
    CREATE_CATEGORY: '/create-category',
    LIST_CATEGORIES: '/list-categories'
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

export const CITIES_ROUTES = {
    CREATE_CITY: '/create-city',
    LIST_CITIES: '/list-cities'
}

export const COUNTRIES_ROUTES = {
    CREATE_COUNTRY: '/create-country',
    LIST_COUNTRIES: '/list-countries'
}

export const SAVES_ROUTES = {
    LIST_SAVES: '/list-user-saves',
    HANDLE_SAVE: '/handle-save'
}

export const CRONS_ROUTES = {
    GENERATE_BACKUP: '/generate-backup'
}

export const BUSINESSES_ROUTES = {
    SUBMIT_BUSINESS: '/submit-business',
    DELETE_BUSINESS: '/delete-business',
    LIST_BUSINESSES: '/list-businesses',
    VIEW_BUSINESS: '/view-business',
    LIST_USER_BUSINESSES: '/list-user-businesses',
    LIST_SIMILAR_BUSINESSES: '/list-similar-businesses'
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
