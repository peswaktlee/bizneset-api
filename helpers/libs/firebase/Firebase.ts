import admin from 'firebase-admin'

import { 
    FB_ADMIN_TYPE,
    FB_ADMIN_PROJECT_ID,
    FB_ADMIN_PRIVATE_KEY_ID,
    FB_ADMIN_PRIVATE_KEY,
    FB_ADMIN_CLIENT_EMAIL,
    FB_ADMIN_CLIENT_ID,
    FB_ADMIN_AUTH_URI,
    FB_ADMIN_TOKEN_URI,
    FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    FB_ADMIN_CLIENT_X509_CERT_URL,
    FB_ADMIN_UNIVERSE_DOMAIN
} from '@/data/constants/Envs'

const Firebase = async () => {
    if (admin?.apps?.length > 0) return admin.app()

    else {
        const FB_SERVICE = {
            type: FB_ADMIN_TYPE,
            project_id: FB_ADMIN_PROJECT_ID,
            private_key_id: FB_ADMIN_PRIVATE_KEY_ID,
            private_key: FB_ADMIN_PRIVATE_KEY,
            client_email: FB_ADMIN_CLIENT_EMAIL,
            client_id: FB_ADMIN_CLIENT_ID,
            auth_uri: FB_ADMIN_AUTH_URI,
            token_uri: FB_ADMIN_TOKEN_URI,
            auth_provider_x509_cert_url: FB_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: FB_ADMIN_CLIENT_X509_CERT_URL,
            universe_domain: FB_ADMIN_UNIVERSE_DOMAIN
        }

        return admin.initializeApp({
            credential: admin.credential.cert(FB_SERVICE as admin.ServiceAccount)
        })
    }
}

export default Firebase