'use client'
import Pagination from '@/app/_global/components/Pagination'
import useFetchCSR from '@/app/_global/hooks/useFetchCSR'
import useUser from '@/app/_global/hooks/useUser'
import { env } from 'process'
import React, { useEffect, useMemo, useRef, useState } from 'react'

const WrittenData = () => {
  const [items, setItems] = useState<any[]>([])
  const [pagination, setPagination] = useState<any[]>([])
  const { loggedMember, isLogin } = useUser()
  const fetchCSR = useFetchCSR()
  const puuid = loggedMember?.puuid || loggedMember?.PUUID
  const url = isLogin && puuid ? `/board/mypage/search?puuid=${puuid}` : null

  useEffect(() => {
    if (!url) return
    if (!isLogin || !puuid) return
    ;(async function({url,items}) {
        const res = await fetchCSR(url)
        const data = await res.json().then(()=>{
          setItems(Array.isArray(data.items) ? data.items : [])
          setPagination(data.pagination)
        }).catch(() => ({} as any))
    })
  }, [items])

  if (!isLogin) return <></>
  return (
    <>
      {items.length > 0 ? (
        <>
          {items.map(({ seq, subject, createdAt }) => (
            <li key={`board-${seq}`}>
              <a href={`/board/view/${seq}`}>{subject}</a>
              <span>{createdAt}</span>
            </li>
          ))}
          {pagination && <Pagination pagination={pagination} />}
        </>
      ) : (
        <li className="noCon">작성하신 글이 없습니다.</li>
      )}
    </>
  )
}

export default React.memo(WrittenData)
