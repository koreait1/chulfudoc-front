'use client'
import React, { useActionState, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { processLogin } from '../_services/actions'
import LoginForm from '../_components/LoginForm'

type FormType = {
  userId: string
  password: string
  redirectUrl?: string
}

const LoginContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processLogin, {})
  const [form, setForm] = useState<FormType>({
    userId: '',
    password: '',
  })

  const searchParams = useSearchParams()
  useEffect(() => {
    const redirectUrl = searchParams.get('redirectUrl')?.toString()
    setForm((prev) => ({ ...prev, redirectUrl }))
  }, [searchParams])

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <LoginForm
      errors={errors}
      action={action}
      pending={pending}
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(LoginContainer)
