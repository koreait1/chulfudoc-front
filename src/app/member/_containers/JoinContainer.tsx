'use client'
import React, { useActionState, useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { processJoin } from '../_services/actions'
import JoinForm from '../_components/JoinForm'

type FormType = {
  gid: string
  userId: string
  email: string
  password: string
  confirmPassword: string
  name: string
  mobile: string
  termsAgree: boolean
  profileImage?: any
}

const JoinContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processJoin, {})
  const [form, setForm] = useState<FormType>({
    gid: uuid(),
    userId: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    mobile: '',
    termsAgree: false,
  })

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onToggle = useCallback(() => {
    setForm((prev) => ({ ...prev, termsAgree: !prev.termsAgree }))
  }, [])

  // 프로필 이미지 업로드 후 후속 처리
  const fileUploadCallback = useCallback((items) => {
    if (items && items.length > 0) {
      setForm((prev) => ({ ...prev, profileImage: items[0] }))
    }
  }, [])

  // 프로필 이미지 삭제 후 후속 처리
  const fileDeleteCallback = useCallback(() => {
    setForm((prev) => {
      const form = { ...prev }
      delete form.profileImage
      return form
    })
  }, [])

  return (
    <JoinForm
      errors={errors}
      action={action}
      pending={pending}
      onChange={onChange}
      onToggle={onToggle}
      fileUploadCallback={fileUploadCallback}
      fileDeleteCallback={fileDeleteCallback}
      form={form}
    />
  )
}

export default React.memo(JoinContainer)
