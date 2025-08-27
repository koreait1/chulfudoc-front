'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { BoardConfigType } from '../_types/BoardType'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

const CommonContainer = ({
  children,
  board,
}: {
  children: React.ReactNode
  board: BoardConfigType
}) => {
  const alertDialog = useAlertDialog()
  const router = useRouter()

  useEffect(() => {
    if (!board || !board.bid) {
      alertDialog({
        text: '게시판을 찾을 수 없습니다.',
        callback: () => {
          router.back()
        },
      })
    }
  }, [board, alertDialog, router])

  return children
}

export default React.memo(CommonContainer)
