'use client'
import { usePathname } from 'next/navigation'
import useUser from '../hooks/useUser'
import styled from 'styled-components'
import FloatingIconContainer from '../container/FloatingIconContainer'

import Header from '../outlines/Header' // 서버 컴포넌트로
import Footer from '../outlines/Footer' // 서버 컴포넌트로
import Aside from '../outlines/Aside' // 서버 컴포넌트로
import AdminHeader from '../outlines/admin/Header'
import AdminSide from '../outlines/admin/Side'
import AdminSubMenu from '../outlines/admin/SubMenus'

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
          <AdminSubMenu />
          {children}
        </section>
      </AdminMain>
    </>
  ) : (
    <>
      <Header />
      <main>
        <Aside className="leftAd" />
        <Aside className="rightAd" />
        <section>{children}</section>
        <FloatingIconContainer />
        <Footer />
      </main>
      <Footer />
    </>
  )
}
