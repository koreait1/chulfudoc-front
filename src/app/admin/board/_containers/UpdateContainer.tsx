'use client'
import React, { useState, useCallback, useActionState } from 'react'
import BoardConfigform from '../_components/BoardConfigForm'
import { processBoardConfig } from '../services/action'
import type { BoardConfigType } from '@/app/board/_types/BoardType'

const UpdateContainer = ({ data }: { data: BoardConfigType }) => {
  const [form, setForm] = useState(data)
  const [errors, action, pending] = useActionState<any, any>(
    processBoardConfig,
    {},
  )

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onKeyValue = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <BoardConfigform
      form={form}
      onChange={onChange}
      errors={errors}
      onKeyValue={onKeyValue}
      action={action}
      pending={pending}
    />
  )
}

export default React.memo(UpdateContainer)
