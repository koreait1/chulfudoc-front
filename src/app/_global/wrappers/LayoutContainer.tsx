'use client'
import { usePathname } from 'next/navigation'
import useUser from '../hooks/useUser'
import loadable from '@loadable/component'
const AdminHeader = loadable(() => import('../outlines/admin/Header'))
const AdminSide = loadable(() => import('../outlines/admin/Side'))

const Header = loadable(() => import('../outlines/Header'))
const Footer = loadable(() => import('../outlines/Footer'))

export default function LayoutContainer({ children }) {
  const { isAdmin } = useUser()
  const pathname = usePathname()

  return isAdmin && pathname.startsWith('/admin') ? (
    <>
      <AdminHeader />
      <main>
        <AdminSide />
        <section className="admin-content">{children}</section>
      </main>
    </>
  ) : (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}
