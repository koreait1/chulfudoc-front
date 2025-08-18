import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import StyledComponentsRegistry from './registry'
import { getLoggedMember } from './member/_services/actions'
import { UserProvider } from './_global/contexts/UserContext'
import { CommonProvider } from './_global/contexts/CommonContext'
import LayoutContainer from './_global/wrappers/LayoutContainer'
import { redirect } from 'next/navigation'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'

export const metadata: Metadata = {
  title: '게시판',
  description: '게시판 설명...',
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
      <body>
        <Header />
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
        <Footer />
      </body>
    </html>
  )
}
