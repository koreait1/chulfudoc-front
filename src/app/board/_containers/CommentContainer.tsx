'use client'
import React, { useState, useCallback, useActionState } from 'react'
import Comment from '../_components/Comment'
import type { CommentType, CommentDataType } from '../_types/CommentType'
import { processComment } from '../_services/action'
import useUser from '@/app/_global/hooks/useUser'

const CommentContainer = ({ board, data }: CommentType) => {
  const { isLogin, loggedMember } = useUser()
  const [form, setForm] = useState<CommentDataType>({
    mode: 'comment_write',
    boardDataSeq: data?.seq,
    commenter: loggedMember?.name ?? '',
    guestPw: '',
    content: '',
    guest: !isLogin,
  })

  const [errors, action, pending] = useActionState<any, any>(processComment, {})

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <Comment
      board={board}
      data={data}
      form={form}
      onChange={onChange}
      errors={errors}
      action={action}
      pending={pending}
    />
  )
}

export default React.memo(CommentContainer)
