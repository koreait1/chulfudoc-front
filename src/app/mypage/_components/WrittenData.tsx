'use client'
import Pagination from '@/app/_global/components/Pagination'
import useFetchCSR from '@/app/_global/hooks/useFetchCSR'
import useUser from '@/app/_global/hooks/useUser'
import React, { useEffect, useState } from 'react'

const WrittenData = () => {
  const [items, setItems] = useState<any[]>([])
  const [pagination, setPagination] = useState<any[]>([])
  const { loggedMember, isLogin } = useUser()
  const fetchCSR = useFetchCSR()
  const puuid = loggedMember.puuid
  useEffect(() => {
    if (!isLogin || !puuid) return
    fetchCSR(`/board/mypage/search?puuid=${puuid}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || [])
        setPagination(data.pagination || [])
      })
  }, [])
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
