'use client'

import type { FC } from 'react'

import { useEffect } from 'react'
import { FULL_APP_HOST } from '@/data/constants'

const Page: FC = (): null => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.location.href = FULL_APP_HOST
        }
    }, [])

    return null
}

export default Page