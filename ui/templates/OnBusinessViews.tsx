import * as React from 'react'

import type { OnBusinessViewsProps } from '@/ts'

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
    onWelcomeViewMain,
    onWelcomeViewContainer,
    onWelcomeViewBox,
    onWelcomeViewParagraph,
    onWelcomeViewLogo,
    onWelcomeViewTitle,
    onWelcomeViewFooter,
    onWelcomeViewFooterCopyright,
    onWelcomeViewGradientBreakline,
    onWelcomeViewSocialButton,
    onWelcomeViewSocialsContainer,
    onWelcomeViewButtonLogo,
    onWelcomeViewParagraphBold,
    onWelcomeViewEndTextStyle,
    onWelcomeViewButton
} from '@/ui/styles'

const siteUrl = FULL_APP_HOST
const logoUrl = ASSETS.LOGO_BLACK_FULL

export const OnBusinessViews = (props: OnBusinessViewsProps) => {
    const { 
        subject, 
        userName, 
        businessName, 
        views,
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

            <Body style={onWelcomeViewMain}>
                <Container style={onWelcomeViewContainer}>
                    <Section style={onWelcomeViewBox}>
                        <Button 
                            style={onWelcomeViewButtonLogo} 
                            href={siteUrl} 
                            target='_blank'
                        >
                            <Img
                                width='118'
                                src={logoUrl}
                                style={onWelcomeViewLogo}
                            />
                        </Button>
                        
                        <Section style={onWelcomeViewGradientBreakline} />

                        <Text style={onWelcomeViewTitle}>
                            {userName || Translation('user')}, {Translation('your-business')} {businessName ? `"${businessName}"` : ''} {Translation('has-reached')} {views ? views : Translation('much')} {Translation('visits')} 👀🎉
                        </Text>
                    
                        <Text style={onWelcomeViewParagraph}>
                            {Translation('on-business-views-paragraph')}
                        </Text>

                        <Button 
                            style={onWelcomeViewButton} 
                            href={businessLink} 
                            target='_blank'
                        >
                            {Translation('view-business')}
                        </Button>

                        <Section style={onWelcomeViewEndTextStyle}>
                            <Text style={onWelcomeViewParagraph}>
                                {Translation('thank-you')},
                            </Text>
                        
                            <Text style={onWelcomeViewParagraphBold}>
                                {Translation('our-team')}
                            </Text>
                        </Section>
                    </Section>
                </Container>

                <Container style={onWelcomeViewFooter}>
                    <Row align='center' style={onWelcomeViewSocialsContainer}>
                        <Button 
                            style={onWelcomeViewSocialButton} 
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
                            style={onWelcomeViewSocialButton} 
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
                            style={onWelcomeViewSocialButton} 
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
                            style={onWelcomeViewSocialButton} 
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

                    <Text style={onWelcomeViewFooterCopyright}>
                        {new Date().getFullYear() + ' ' + Translation('mail-footer-copyright')}
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default OnBusinessViews