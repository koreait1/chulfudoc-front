'use client'

import React, { useState, useCallback } from 'react'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import FindForm from '../_components/FindForm'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'

type FormType = { userId: string; email: string }

export default function FindPwContainer() {
  const [form, setForm] = useState<FormType>({ userId: '', email: '' })
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [pending, setPending] = useState(false)
  const alertDialog = useAlertDialog()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const findPwCallback = ({ status }: { status: number }) => {
    setPending(false)
    if (status >= 200 && status < 300) {
      alertDialog({
        title: '메일 발송 완료',
        text: '입력하신 이메일로 임시 비밀번호를 보냈습니다.',
        icon: 'success',
      })
      setErrors({})
    } else {
      setErrors({ global: '아이디 또는 이메일을 확인하고 다시 시도해 주세요.' })
    }
  }

  return (
    <FindForm
      errors={errors}
      pending={pending}
      form={form}
      onChange={onChange}
      onCallback={findPwCallback}
      setPending={setPending}
      fields={[
        {
          name: 'userId',
          placeholder: '아이디를 입력하세요',
          type: 'text',
          autoComplete: 'username',
        },
        {
          name: 'email',
          placeholder: '이메일을 입력하세요.',
          type: 'email',
          autoComplete: 'email',
        },
      ]}
      apiUrl={ApiUrl.PWRESET}
      submitText="임시 비밀번호 보내기"
    />
  )
}
