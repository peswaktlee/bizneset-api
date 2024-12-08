import type { FC } from 'react'

import { useEffect } from 'react'
import { PUBLIC_SITE } from '@/data/constants'

const Page: FC = (): null => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.href = PUBLIC_SITE
        }
    }, [])

    return null
}

export default Page