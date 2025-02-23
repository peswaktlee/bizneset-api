import * as React from 'react'

import type { OnWelcomeEmailProps } from '@/ts'

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
    onWelcomeMain,
    onWelcomeContainer,
    onWelcomeBox,
    onWelcomeParagraph,
    onWelcomeLogo,
    onWelcomeTitle,
    onWelcomeFooter,
    onWelcomeFooterCopyright,
    onWelcomeGradientBreakline,
    onWelcomeSocialButton,
    onWelcomeSocialsContainer,
    onWelcomeButtonLogo,
    onWelcomeParagraphBold,
    onWelcomeEndTextStyle
} from '@/ui/styles'

const siteUrl = FULL_APP_HOST
const logoUrl = ASSETS.LOGO_BLACK_FULL

export const OnWelcome = (props: OnWelcomeEmailProps) => {
    const { subject, userName } = props

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

            <Body style={onWelcomeMain}>
                <Container style={onWelcomeContainer}>
                    <Section style={onWelcomeBox}>
                        <Button 
                            style={onWelcomeButtonLogo} 
                            href={siteUrl} 
                            target='_blank'
                        >
                            <Img
                                width='118'
                                src={logoUrl}
                                style={onWelcomeLogo}
                            />
                        </Button>
                        
                        <Section style={onWelcomeGradientBreakline} />

                        <Text style={onWelcomeTitle}>
                            {Translation('salam')}, {userName || Translation('user')} 👋
                        </Text>
                    
                        <Text style={onWelcomeParagraph}>
                            {Translation('on-welcome-paragraph')}
                        </Text>

                        <Text style={onWelcomeParagraph}>
                            {Translation('on-welcome-paragraph-2')}
                        </Text>

                        <Section style={onWelcomeEndTextStyle}>
                            <Text style={onWelcomeParagraph}>
                                {Translation('thank-you')},
                            </Text>

                            <Text style={onWelcomeParagraphBold}>
                                {Translation('our-team')}
                            </Text>
                        </Section>
                    </Section>
                </Container>

                <Container style={onWelcomeFooter}>
                    <Row align='center' style={onWelcomeSocialsContainer}>
                        <Button 
                            style={onWelcomeSocialButton} 
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
                            style={onWelcomeSocialButton} 
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
                            style={onWelcomeSocialButton} 
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
                            style={onWelcomeSocialButton} 
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

                    <Text style={onWelcomeFooterCopyright}>
                        {new Date().getFullYear() + ' ' + Translation('mail-footer-copyright')}
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default OnWelcome