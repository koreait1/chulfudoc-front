'use client'
import React, { useState, useCallback } from 'react'
import Comment from '../_components/Comment'
import type { CommentType, CommentDataType } from '../_types/CommentType'
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

  const onChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return <Comment board={board} data={data} form={form} onChange={onChange} />
}

export default React.memo(CommentContainer)
