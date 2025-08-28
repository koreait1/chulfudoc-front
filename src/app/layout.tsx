import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import StyledComponentsRegistry from './registry'
import { getLoggedMember } from './member/_services/actions'
import { UserProvider } from './_global/contexts/UserContext'
import { CommonProvider } from './_global/contexts/CommonContext'
import LayoutContainer from './_global/wrappers/LayoutContainer'
import { redirect } from 'next/navigation'
import { GoogleAdSense } from './_global/components/Adsense'

export const metadata: Metadata = {
  title: '철푸닥',
  description: '낙상 감지 서비스',
}

const tmapApiUrl = `https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const member = await getLoggedMember()
  const cookie = await cookies()

  if (member == null && cookie.has('token')) {
    redirect('/member/api/logout?redirectUrl=/')
  }

  return (
    <html lang="ko">
      <head>
        {/* 광고 */}
        <GoogleAdSense />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src={tmapApiUrl}></script>
      </head>
      <body id="body">
        <StyledComponentsRegistry>
          <CommonProvider>
            <UserProvider
              loggedMember={member}
              token={cookie.get('token')?.value}
            >
              <LayoutContainer>{children}</LayoutContainer>
            </UserProvider>
          </CommonProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
