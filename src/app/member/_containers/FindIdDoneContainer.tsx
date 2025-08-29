'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import FindIdDoneForm from '../_components/FindIdDoneForm'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 40px auto 80px;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export default function FindIdDoneContainer() {
  const router = useRouter()
  const [form, setForm] = useState<{ userId: string }>({ userId: '' })
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [pending, setPending] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = sessionStorage.getItem('find:id')
    if (!id) {
      setErrors({ global: '잘못된 접근입니다.' })
    } else {
      setForm({ userId: id })
    }
    setReady(true)
  }, [])

  const onLogin = useCallback(() => {
    sessionStorage.removeItem('find:id')
    router.push('/member/login')
  }, [router])

  const onFindPw = useCallback(() => {
    sessionStorage.removeItem('find:id')
    router.push('/member/findpw')
  }, [router])

  if (!ready) return null

  return (
    <StyledDiv>
      <FindIdDoneForm
        form={form}
        errors={errors}
        pending={pending}
        setPending={setPending}
        onCallback={onLogin}
        onSecondary={onFindPw}
      />
    </StyledDiv>
  )
}
