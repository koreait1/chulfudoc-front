'use client'
import React, { useState, useEffect, useActionState, useCallback } from 'react'

import BoardForm from '../_components/BoardForm'
import { BoardDataType, type BoardFormType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import useUser from '@/app/_global/hooks/useUser'
import { processUpdate } from '../_services/action'

const UpdateContainer = ({ board, data }: BoardFormType) => {
  const [_data, setData] = useState<BoardDataType>(data)
  const [errors, action, pending] = useActionState<any, any>(processUpdate, {})
  const { isLogin, loggedMember } = useUser()

  useEffect(() => {
    if (_data.mode === 'write') {
      _data.guest = !isLogin

      if (isLogin) {
        _data.poster = loggedMember.name
      }

      setData({ ..._data })
    }
  }, [_data, isLogin, loggedMember.name])

  const onChange = useCallback((e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const onToggle = useCallback((key, value) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  return (
    <CommonContainer board={board}>
      <BoardForm
        board={board}
        data={_data}
        errors={errors}
        pending={pending}
        action={action}
      />
    </CommonContainer>
  )
}

export default React.memo(UpdateContainer)
