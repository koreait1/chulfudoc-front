'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import FindForm from '../_components/FindForm'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'

type FormType = { name: string; email: string }

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000/api/v1'

export default function FindIdContainer() {
  const router = useRouter()
  const [form, setForm] = useState<FormType>({ name: '', email: '' })
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [pending, setPending] = useState(false)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const findIdCallback = useCallback(
    async ({ status, data }: { status: number; data?: any }) => {
      setPending(false)

      if (status < 200 || status >= 300) {
        setErrors({ global: '이름 또는 이메일을 확인하고 다시 시도해 주세요.' })
        return
      }

      let userId: string | undefined = data?.userId

      if (!userId) {
        const qs = new URLSearchParams({
          name: (form.name ?? '').trim(),
          email: (form.email ?? '').trim(),
        }).toString()

        const url = `${API_BASE}${ApiUrl.FINDUSERID}${qs}`
        const res = await fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        })

        if (res.ok) {
          const json = await res.json().catch(() => ({}))
          userId = json?.userId
        } else {
          setErrors({ global: '아이디 정보를 찾을 수 없습니다.' })
          return
        }
      }

      if (!userId) {
        setErrors({ global: '아이디 정보를 찾을 수 없습니다.' })
        return
      }

      setErrors({})
      sessionStorage.setItem('find:id', userId)
      router.push('/member/findid/findidDone')
    },
    [form, router],
  )

  return (
    <FindForm
      errors={errors}
      pending={pending}
      form={form}
      onChange={onChange}
      onCallback={findIdCallback}
      setPending={setPending}
      fields={[
        {
          name: 'name',
          placeholder: '이름을 입력하세요',
          type: 'text',
          autoComplete: 'name',
        },
        {
          name: 'email',
          placeholder: '회원가입 시 사용한 이메일을 입력하세요',
          type: 'email',
          autoComplete: 'email',
        },
      ]}
      apiUrl={ApiUrl.FINDUSERID}
      submitText="아이디 찾기"
    />
  )
}
