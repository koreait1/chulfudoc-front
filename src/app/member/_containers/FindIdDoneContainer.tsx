'use client'

import React, { useEffect, useState } from 'react'

export default function FindIdDoneContainer() {
  const [userId, setUserId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUserId(sessionStorage.getItem('find:id') ?? null)
    setReady(true)
  }, [])

  if (!ready) return null

  if (!userId) {
    return (
      <>
        <div>잘못된 접근입니다.</div>
        <a href="/member/findid">아이디 찾기 페이지로 이동</a>
      </>
    )
  }

  return (
    <>
      <div>아이디 찾기 완료</div>
      <div>회원님의 아이디: {userId}</div>
      <div>
        <a href="/login" onClick={() => sessionStorage.removeItem('find:id')}>
          로그인
        </a>
        {' | '}
        <a
          href="/member/findpw"
          onClick={() => sessionStorage.removeItem('find:id')}
        >
          비밀번호 찾기
        </a>
      </div>
    </>
  )
}
