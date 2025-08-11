import type { Metadata } from 'next'
import './globals.css'
import Header from './_global/outlines/Header'
import Footer from './_global/outlines/Footer'

export const metadata: Metadata = {
  title: '철부닥',
  description: '낙상 감지 및 대처 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
