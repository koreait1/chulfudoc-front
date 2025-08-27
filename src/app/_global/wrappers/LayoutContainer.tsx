'use client'
import { usePathname } from 'next/navigation'
import useUser from '../hooks/useUser'
import loadable from '@loadable/component'
import styled from 'styled-components'
import Aside from '../outlines/Aside'

const AdminHeader = loadable(() => import('../outlines/admin/Header'))
const AdminSide = loadable(() => import('../outlines/admin/Side'))
const AdminSubMenu = loadable(() => import('../outlines/admin/SubMenus'))

const Header = loadable(() => import('../outlines/Header'))
const Footer = loadable(() => import('../outlines/Footer'))

const AdminMain = styled.main`
  display: flex;
  min-height: 750px;
  aside {
    width: 220px;
  }
  section.admin-content {
    flex-grow: 1;
    padding: 30px 50px;
  }
`

export default function LayoutContainer({ children }) {
  const { isAdmin } = useUser()
  const pathname = usePathname()

  return isAdmin && pathname.startsWith('/admin') ? (
    <>
      <AdminHeader />
      <AdminMain>
        <AdminSide />
        <section className="admin-content">
          <Aside className="rightAd" />
          {children}
          <Aside className="leftAd" />
        </section>
      </AdminMain>
    </>
  ) : (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}
