'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BoardConfigType, BoardDataType } from '../_types/BoardType'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

const CommonContainer = ({
  children,
  board,
  data,
}: {
  children: React.ReactNode
  board?: BoardConfigType
  data?: BoardDataType
}) => {
  const alertDialog = useAlertDialog()
  const router = useRouter()
  const [isError, setError] = useState<boolean>(false)

  useEffect(() => {
    // 게시글 수정, 보기일 때 게시글이 있는지 체크
    if (
      data &&
      data.mode &&
      ['update', 'view'].includes(data?.mode) &&
      !data.seq
    ) {
      alertDialog({
        text: '게시글을 찾을 수 없습니다',
        callback: () => {
          router.back()
        },
      })
      setError(true)
      return
    }

    if (!board || !board.bid) {
      alertDialog({
        text: '게시판을 찾을 수 없습니다.',
        callback: () => {
          router.back()
        },
      })
      setError(true)
    }
  }, [board, alertDialog, router, data])

  return isError ? <></> : children
}

export default React.memo(CommonContainer)
