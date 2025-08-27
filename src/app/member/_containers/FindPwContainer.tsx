'use client'

import React, { useState, useCallback } from 'react'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import FindPwForm from '../_components/FindPwForm'

type FormType = {
  userId: string
  email: string
}

const FindPwContainer = () => {
  const [form, setForm] = useState<FormType>({ userId: '', email: '' })
  const [errors, setErrors] = useState<Record<string, any>>({})
  const [pending, setPending] = useState(false)
  const alertDialog = useAlertDialog()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  const findPwCallback = ({ status }: { status: number }) => {
    setPending(false)
    if (status >= 200 && status < 300) {
      alertDialog({
        title: '메일 발송 완료',
        text: '입력하신 이메일로 임시 비밀번호를 보냈습니다.',
        icon: 'success',
      })
    } else {
      setErrors({ global: '아이디 또는 이메일을 확인하고 다시 시도해 주세요.' })
    }
  }

  return (
    <FindPwForm
      errors={errors}
      pending={pending}
      form={form}
      onChange={onChange}
      onCallback={findPwCallback}
      setPending={setPending}
    />
  )
}

export default React.memo(FindPwContainer)
