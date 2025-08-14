import type { Metadata } from 'next'
import './globals.css'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'
import StyledComponentsRegistry from './registry'
import { getLoggedMember } from './member/_services/actions'
import { UserProvider } from './_global/contexts/UserContext'

export const metadata: Metadata = {
  title: '철부닥',
  description: '낙상 감지 및 대처 서비스',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const member = await getLoggedMember()
  console.log('member:', member) // 확인용
  return (
    <html lang="ko">
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
