'use client'
import React, { useActionState, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchForm from '../_components/SearchForm'

type FormType = {
  bid: string
  category?: string
  email?: string
}

const SearchContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processBoard, {})
  const [form, setForm] = useState<FormType>({
    bid: '',
    category: '',
    email: '',
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const redirectUrl = searchParams.get('redirectUrl')?.toString()
    if (!redirectUrl) return

    setForm((prev) => ({ ...prev, redirectUrl }))
  }, [searchParams])

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <SearchForm
      errors={errors}
      action={action}
      pending={pending}
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(SearchContainer)
