'use client'
import React, { useActionState, useState, useCallback } from 'react'
import { processJoin } from '../_services/actions'
import JoinForm from '../_components/JoinForm'

type FormType = {
  email: string
  password: string
  confirmPassword: string
  name: string
  mobile: string
  termsAgree: boolean
}

const JoinContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processJoin, {})
  const [form, setForm] = useState<FormType>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    mobile: '',
    termsAgree: false,
  })

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onToggle = useCallback(() => {
    setForm((prev) => ({ ...prev, termsAgree: !prev.termsAgree }))
  }, [])

  return (
    <JoinForm
      errors={errors}
      action={action}
      pending={pending}
      onChange={onChange}
      onToggle={onToggle}
      form={form}
    />
  )
}

export default React.memo(JoinContainer)