import { Resend as r } from 'resend'
import { RESEND_API_SECRET_KEY } from '@/data/constants'

const Resend = new r(RESEND_API_SECRET_KEY)
export default Resend