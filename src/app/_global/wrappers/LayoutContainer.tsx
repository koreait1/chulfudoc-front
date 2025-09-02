'use client'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import useUser from '../hooks/useUser'
import styled from 'styled-components'

import AdminHeader from '../outlines/admin/Header'
import AdminSide from '../outlines/admin/Side'
import AdminSubMenu from '../outlines/admin/SubMenus'

const AdminMain = styled.main`
  display: flex;
  min-height: 750px;
  section.admin-content {
    flex-grow: 1;
    padding: 30px 50px;
  }
`

function getMainClasses(pathname) {
  const paths = pathname.split('/')
  const data: Array<string> = []
  if (pathname.startsWith('/admin')) return
  if (paths.length > 1) data.push(paths[1])
  if (paths.length > 2) data.push(`${paths[1]}-${paths[2]}`)

  const path = data.join(' ')
  return path ? ' ' + path : ' main-page'
}

export default function LayoutContainer({ children }) {
  const { isAdmin } = useUser()
  const pathname = usePathname()

  const mainClasses = useMemo(() => getMainClasses(pathname), [pathname])

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
      <main
        suppressHydrationWarning={true}
        className={'main-content' + mainClasses}
      >
        <section>{children}</section>
      </main>
    </>
  )
}
