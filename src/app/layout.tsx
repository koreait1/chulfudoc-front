import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'
import StyledComponentsRegistry from './registry'
import { getLoggedMember } from './member/_services/actions'
import { UserProvider } from './_global/contexts/UserContext'
import { redirect } from 'next/navigation'
import { GoogleAdSense } from './_global/components/adsense'

export const metadata: Metadata = {
  title: '철푸닥',
  description: '낙상 감지 서비스',
}

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
      </head>
      <body>
        <StyledComponentsRegistry>
          <UserProvider loggedMember={member}>
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </UserProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
