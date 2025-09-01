'use client'
import Header from '@/app/_global/outlines/Header'
import '../../globals.css'
import Contents from '@/app/_global/wrappers/ContentContainer'
import Footer from '@/app/_global/outlines/Footer'
import { usePathname } from 'next/navigation'
export default function HasHF({ children }) {
  const pathname = usePathname()
  const hide = pathname.endsWith('/profile')
  if (hide) {
    return <Contents>{children}</Contents>
  }
  return (
    <>
      <Header />
      <Contents>{children}</Contents>
      <Footer />
    </>
  )
}
