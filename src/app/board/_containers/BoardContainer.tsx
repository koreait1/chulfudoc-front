'use client'
import React, { useActionState, useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchForm from '../_components/SearchForm'
import BoardList from '../_components/BoardList'

type FormType = {
  bid: string
  category?: string
  email?: string
}

const BoardContainer = () => {
  const [errors, action, pending] = useActionState<any, any>(processBoard, {})
  const [form, setForm] = useState<FormType>({
    bid: '',
    category: '',
    email: '',
  })

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <>
      <SearchForm
        errors={errors}
        action={action}
        pending={pending}
        form={form}
        onChange={onChange}
      />
      <BoardList />
    </>
  )
}

export default React.memo(BoardContainer)
