import * as React from 'react'

import type { OnBusinessRejectionProps } from '@/ts'

import { Fragment } from 'react'
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
    onBusinessRejectionMain,
    onBusinessRejectionContainer,
    onBusinessRejectionBox,
    onBusinessRejectionParagraph,
    onBusinessRejectionLogo,
    onBusinessRejectionTitle,
    onBusinessRejectionFooter,
    onBusinessRejectionFooterCopyright,
    onBusinessRejectionGradientBreakline,
    onBusinessRejectionSocialButton,
    onBusinessRejectionSocialsContainer,
    onBusinessRejectionButtonLogo,
    onBusinessRejectionParagraphBold,
    onBusinessRejectionEndTextStyle,
    onBusinessRejectionButton,
    onBusinessRejectionReasonContainer,
    onBusinessRejectionReasonParagraph,
    onBusinessRejectionReasonParagraphSmall
} from '@/ui/styles'

const siteUrl = FULL_APP_HOST
const logoUrl = ASSETS.LOGO_BLACK_FULL

export const OnBusinessRejection = (props: OnBusinessRejectionProps) => {
    const { 
        subject, 
        userName, 
        businessName, 
        businessLink,
        reasonOfRejection
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

            <Body style={onBusinessRejectionMain}>
                <Container style={onBusinessRejectionContainer}>
                    <Section style={onBusinessRejectionBox}>
                        <Button 
                            style={onBusinessRejectionButtonLogo} 
                            href={siteUrl} 
                            target='_blank'
                        >
                            <Img
                                width='118'
                                src={logoUrl}
                                style={onBusinessRejectionLogo}
                            />
                        </Button>
                        
                        <Section style={onBusinessRejectionGradientBreakline} />

                        <Text style={onBusinessRejectionTitle}>
                            {userName || Translation('user')}, {Translation('your-business')} {businessName ? `"${businessName}"` : ''} {Translation('is-rejected')} ❌
                        </Text>
                    
                        <Text style={onBusinessRejectionParagraph}>
                            {reasonOfRejection ? Translation('on-business-rejection-paragraph') :  Translation('on-business-rejection-paragraph-no-reason')}
                        </Text>

                        {
                            // reasonOfRejection && 
                            <Fragment>
                                <Text style={onBusinessRejectionReasonParagraphSmall}>
                                    {Translation('reason-of-rejection')?.toLocaleUpperCase()}:
                                </Text>

                                <Section style={onBusinessRejectionReasonContainer}>
                                    <Text style={onBusinessRejectionReasonParagraph}>
                                        {reasonOfRejection}
                                        {Translation('on-business-rejection-paragraph')}
                                    </Text>
                                </Section>
                            </Fragment>
                        }
                       
                        <Text style={onBusinessRejectionParagraph}>
                            {Translation('on-business-rejection-info-paragraph')}
                        </Text>

                        <Button 
                            style={onBusinessRejectionButton} 
                            href={businessLink} 
                            target='_blank'
                        >
                            {Translation('manage-business')}
                        </Button>

                        <Section style={onBusinessRejectionEndTextStyle}>
                            <Text style={onBusinessRejectionParagraph}>
                                {Translation('thank-you')},
                            </Text>
                        
                            <Text style={onBusinessRejectionParagraphBold}>
                                {Translation('our-team')}
                            </Text>
                        </Section>
                    </Section>
                </Container>

                <Container style={onBusinessRejectionFooter}>
                    <Row align='center' style={onBusinessRejectionSocialsContainer}>
                        <Button 
                            style={onBusinessRejectionSocialButton} 
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
                            style={onBusinessRejectionSocialButton} 
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
                            style={onBusinessRejectionSocialButton} 
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
                            style={onBusinessRejectionSocialButton} 
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

                    <Text style={onBusinessRejectionFooterCopyright}>
                        {new Date().getFullYear() + ' ' + Translation('mail-footer-copyright')}
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

export default OnBusinessRejection