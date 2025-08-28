'use client'
import useFetchCSR from '@/app/_global/hooks/useFetchCSR'
import useUser from '@/app/_global/hooks/useUser'
import React, { useEffect, useState } from 'react'
const WrittenData = () => {
  const [items, setItems] = useState<any[]>([])
  const { loggedMember, isLogin } = useUser()
  const fetchCSR = useFetchCSR()
  const userId = loggedMember.userId
  useEffect(() => {
    if (!isLogin || !userId) return
    fetchCSR(`/board/mypage/search?userId=${userId}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
  }, [fetchCSR, isLogin, userId])
  if (!isLogin) return <></>
  return (
    <>
      {items.length ? (
        items.map(({ seq, subject, createdAt }) => (
          <li key={'board-' + seq}>
            <a href="/view/{seq}">{subject}</a>
            <span>{createdAt}</span>
          </li>
        ))
      ) : (
        <li key="" className="noCon">
          작성하신 글이 없습니다.
        </li>
      )}
    </>
  )
}

export default React.memo(WrittenData)
