import * as React from 'react'

import type { OnBusinessApprovalProps } from '@/ts'

import { Translation } from '@/helpers/generals'
import { ASSETS, SOCIAL_MEDIAS } from '@/data/constants'
import { FULL_APP_HOST } from '@/data/constants/Envs'

import {
    Body,
    Button,
    Container,
    Font,
    Head,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text
} from '@react-email/components'

import {
    onBusinessApprovalMain,
    onBusinessApprovalContainer,
    onBusinessApprovalBox,
    onBusinessApprovalParagraph,
    onBusinessApprovalLogo,
    onBusinessApprovalTitle,
    onBusinessApprovalFooter,
    onBusinessApprovalFooterCopyright,
    onBusinessApprovalGradientBreakline,
    onBusinessApprovalSocialButton,
    onBusinessApprovalSocialsContainer,
    onBusinessApprovalButtonLogo,
    onBusinessApprovalParagraphBold,
    onBusinessApprovalEndTextStyle,
    onBusinessApprovalButton
} from '@/ui/styles'

const siteUrl = FULL_APP_HOST
const logoUrl = ASSETS.LOGO_BLACK_FULL

export const OnBusinessApproval = (props: OnBusinessApprovalProps) => {
    const { 
        subject, 
        userName, 
        businessName, 
        businessLink
    } = props

    return (
        <Html>
            <Head>
                <Font
                    fontFamily='Dm Sans'
                    fallbackFontFamily='Arial'
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTmf3ZGMZpg.ttf',
                        format: 'woff2'
                    }}
                />
            </Head>

            <Preview>
                {subject}
            </Preview>

            <Body style={onBusinessApprovalMain}>
                <Container style={onBusinessApprovalContainer}>
                    <Section style={onBusinessApprovalBox}>
                        <Button 
                            style={onBusinessApprovalButtonLogo} 
                            href={siteUrl} 
                            target='_blank'
                        >
                            <Img
                                width='118'
                                src={logoUrl}
                                style={onBusinessApprovalLogo}
                            />
                        </Button>
                        
                        <Section style={onBusinessApprovalGradientBreakline} />

                        <Text style={onBusinessApprovalTitle}>
                            {userName || Translation('user')}, {Translation('your-business')} {businessName ? `"${businessName}"` : ''} {Translation('is-approved')} ✅
                        </Text>
                    
                        <Text style={onBusinessApprovalParagraph}>
                            {Translation('on-business-approval-paragraph')}
                        </Text>

                        <Button 
                            style={onBusinessApprovalButton} 
                            href={businessLink} 
                            target='_blank'
                        >
                            {Translation('view-business')}
                        </Button>

                        <Section style={onBusinessApprovalEndTextStyle}>
                            <Text style={onBusinessApprovalParagraph}>
                                {Translation('thank-you')},
                            </Text>
                        
                            <Text style={onBusinessApprovalParagraphBold}>
                                {Translation('our-team')}
                            </Text>
                        </Section>
                    </Section>
                </Container>

                <Container style={onBusinessApprovalFooter}>
                    <Row align='center' style={onBusinessApprovalSocialsContainer}>
                        <Button 
                            style={onBusinessApprovalSocialButton} 
                            href={SOCIAL_MEDIAS.FACEBOOK}
                            target='_blank'
                        >
                            <Img
                                height='28'
                                width='28'
                                src={ASSETS.SOCIAL_MEDIA_ICON_FACEBOOK}
                            />
                        </Button>

                        <Button 
                            style={onBusinessApprovalSocialButton} 
                            href={SOCIAL_MEDIAS.YOUTUBE}
                            target='_blank'
                        >
                            <Img
                                height='28'
                                width='28'
                                src={ASSETS.SOCIAL_MEDIA_ICON_YOUTUBE}
                            />
                        </Button>
                        
                        <Button 
                            style={onBusinessApprovalSocialButton} 
                            href={SOCIAL_MEDIAS.LINKEDIN}
                            target='_blank'
                        >
                            <Img
                                height='28'
                                width='28'
                                src={ASSETS.SOCIAL_MEDIA_ICON_LINKEDIN}
                            />
                        </Button>

                        <Button 
                            style={onBusinessApprovalSocialButton} 
                            href={SOCIAL_MEDIAS.INSTAGRAM}
                            target='_blank'
                        >
                            <Img
                                height='28'
                                width='28'
                                src={ASSETS.SOCIAL_MEDIA_ICON_INSTAGRAM}
                            />
                        </Button>
                    </Row>

                    <Text style={onBusinessApprovalFooterCopyright}>
                        {new Date().getFullYear() + ' ' + Translation('mail-footer-copyright')}
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default OnBusinessApproval