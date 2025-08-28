'use client'
import { usePathname } from 'next/navigation'
import useUser from '../hooks/useUser'
import loadable from '@loadable/component'
import styled from 'styled-components'
import FloatingIconContainer from '../container/FloatingIconContainer'

const AdminHeader = loadable(() => import('../outlines/admin/Header'))
const AdminSide = loadable(() => import('../outlines/admin/Side'))

const Header = loadable(() => import('../outlines/Header'))
const Footer = loadable(() => import('../outlines/Footer'))
const Aside = loadable(() => import('../outlines/Aside'))

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
        <section className="admin-content">{children}</section>
      </AdminMain>
    </>
  ) : (
    <>
      <Header />
      <main>
        <Aside className="rightAd" />
        <section className="main-content">{children}</section>
        <Aside className="leftAd" />
        <FloatingIconContainer />
        <Footer />
      </main>
    </>
  )
}
