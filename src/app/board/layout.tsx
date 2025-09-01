import '../globals.css'
import Header from '../_global/outlines/Header'
import Footer from '../_global/outlines/Footer'
import Contents from '../_global/wrappers/ContentContainer'
import styled from 'styled-components'

import BoardTabs from '@/app/board/_components/BoardTabs'
import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'

export default async function MypageLayout({ children }) {
  noStore()

  const base = (
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    ''
  ).replace(/\/$/, '')
  const cookieHeader = cookies().toString()
  let boards = []
  try {
    const res = await fetch(`${base}/board/list/all`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    })
    if (res.ok) boards = await res.json()
  } catch {}

  return (
    <div style={{ padding: 15 }}>
      <Header />
      <Contents>
        <div style={{ height: 8 }} /> <BoardTabs boards={boards as any} />
        {children}
      </Contents>
      <Footer />
    </div>
  )
}
