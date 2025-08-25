'use client'
import React, { useActionState, useState, useCallback } from 'react'
import { processFindPw } from '../_services/actions'
import FindPwForm from '../_components/FindPwForm'

type FormType = {
  userId: string
  email: string
}

const FindPwContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processFindPw, {})
  const [form, setForm] = useState<FormType>({
     userId: '',
     email: '' 
    })

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  return (
    <FindPwForm
      errors={errors}
      action={action}
      pending={pending}
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(FindPwContainer)
