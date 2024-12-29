import type { Context } from 'hono'
import { DECRYPT_KEY } from '@/data/constants'

const DecodeBody = async (c: Context) => {
    const encoded = await c?.req?.json()

    if (typeof encoded === 'string') {
        const key = DECRYPT_KEY
        const data = decodeURIComponent(encoded)

        let decoded = ''

        for (let i = 0; i < data.length; i++) {
            decoded += String.fromCharCode(
                data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            )
        }

        return JSON.parse(decoded)
    } 
    
    else return encoded
}

export default DecodeBody