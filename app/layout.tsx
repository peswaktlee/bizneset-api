import type { Metadata, FC } from 'next'
import type { RootLayout } from '@/ts'

import { Translation } from '@/helpers/generals'

export const metadata: Metadata = {
    title: Translation('app-name'),
    description: Translation('app-description')
}

const Layout: FC<RootLayout> = (props) => {
    const { children } = props

    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}

export default Layout