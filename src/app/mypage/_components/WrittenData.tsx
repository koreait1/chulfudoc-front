'use client'
import Pagination from '@/app/_global/components/Pagination'
import useFetchCSR from '@/app/_global/hooks/useFetchCSR'
import useUser from '@/app/_global/hooks/useUser'
import React, { useEffect, useState } from 'react'

const WrittenData = () => {
  const fetchCSR = useFetchCSR()
  const [items, setItems] = useState<any[]>([])
  const [pagination, setPagination] = useState<any[]>([])
  const { loggedMember, isLogin } = useUser()
  const puuid = loggedMember?.puuid || 'b3150ca5-8ed5-4dff-9cb9-313225b4379b'
  const url = `/board/mypage/search?puuid=${puuid}&isLogin=${isLogin}`

  useEffect(() => {
    if (!isLogin || !puuid) return
    const getBoardList = async () => {
      fetchCSR(url, { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
          setItems(Array.isArray(data.items) ? data.items : [])
          setPagination(data.pagination)
        })
        .catch(() => ({} as any))
    }
    getBoardList()
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

export default WrittenData
