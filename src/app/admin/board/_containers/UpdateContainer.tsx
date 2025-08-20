'use client'
import React, { useState, useCallback, useActionState } from 'react'
import BoardConfigform from '../_components/BoardConfigForm'
import useBoardConfig from '@/app/board/_hooks/useBoardConfig'
import { processBoardConfig } from '../services/action'

type PropType = {
  bid?: string
}

const UpdateContainer = ({ bid }: PropType) => {
  const boardConfig = useBoardConfig(bid)
  const [form, setForm] = useState(boardConfig)

  const [errors, action, pending] = useActionState<any, any>(
    processBoardConfig,
    {},
  )

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <BoardConfigform
      form={form}
      onChange={onChange}
      errors={errors}
      action={action}
      pending={pending}
    />
  )
}

export default React.memo(UpdateContainer)
