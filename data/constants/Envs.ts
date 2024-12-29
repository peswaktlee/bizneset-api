// Generals
export const HOST: string = process.env.HOST as string
export const PORT: string = process.env.PORT as string
export const UNIVERSE: string = process.env.UNIVERSE as string
export const ENV: string = process.env.ENV as string
export const ORIGINS: string = process.env.ORIGINS as string
export const SECRET_KEY: string = process.env.SECRET_KEY as string
export const DECRYPT_KEY: string = process.env.DECRYPT_KEY as string
export const PUBLIC_SITE: string = process.env.NEXT_PUBLIC_PUBLIC_SITE as string

// Mongo
export const MONGO_CLUSTER: string = process.env.MONGO_CLUSTER as string
export const MONGO_DB_NAME: string = process.env.MONGO_DB_NAME as string
export const MONGO_DB_PASSWORD: string = process.env.MONGO_DB_PASSWORD as string
export const MONGO_DB_ADMIN: string = process.env.MONGO_DB_ADMIN as string

// Cloudflare
export const CLOUDFLARE_TOKEN_VALUE: string = process.env.CLOUDFLARE_TOKEN_VALUE as string
export const CLOUDFLARE_ACCESS_KEY_ID: string = process.env.CLOUDFLARE_ACCESS_KEY_ID as string
export const CLOUDFLARE_SECRET_ACCESS_KEY: string = process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string
export const CLOUDFLARE_S3_EU_ENDPOINT: string = process.env.CLOUDFLARE_S3_EU_ENDPOINT as string
export const CLOUDFLARE_S3_US_ENDPOINT: string = process.env.CLOUDFLARE_S3_US_ENDPOINT as string

// Resend
export const RESEND_API_SECRET_KEY: string = process.env.RESEND_API_SECRET_KEY as string
export const RESEND_GENERAL_AUDIENCE_ID: string = process.env.RESEND_GENERAL_AUDIENCE_ID as string

// Firebase Admin
export const FB_ADMIN_TYPE: string = process.env.FB_ADMIN_TYPE as string
export const FB_ADMIN_PROJECT_ID: string = process.env.FB_ADMIN_PROJECT_ID as string
export const FB_ADMIN_PRIVATE_KEY_ID: string = process.env.FB_ADMIN_PRIVATE_KEY_ID as string
export const FB_ADMIN_PRIVATE_KEY: string = process.env.FB_ADMIN_PRIVATE_KEY as string
export const FB_ADMIN_CLIENT_EMAIL: string = process.env.FB_ADMIN_CLIENT_EMAIL as string
export const FB_ADMIN_CLIENT_ID: string = process.env.FB_ADMIN_CLIENT_ID as string
export const FB_ADMIN_AUTH_URI: string = process.env.FB_ADMIN_AUTH_URI as string
export const FB_ADMIN_TOKEN_URI: string = process.env.FB_ADMIN_TOKEN_URI as string
export const FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL: string = process.env.FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL as string
export const FB_ADMIN_CLIENT_X509_CERT_URL: string = process.env.FB_ADMIN_CLIENT_X509_CERT_URL as string
export const FB_ADMIN_UNIVERSE_DOMAIN: string = process.env.FB_ADMIN_UNIVERSE_DOMAIN as string