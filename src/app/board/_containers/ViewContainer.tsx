'use client'
import React, { useContext, useLayoutEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { BoardConfigType, BoardDataType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import BoardView from '../_components/BoardView'
import CommonContext from '@/app/_global/contexts/CommonContext'
import useConfirmDialog from '@/app/_global/hooks/useConfirmDialog'

const ViewContainer = ({
  board,
  data,
}: {
  board?: BoardConfigType
  data?: BoardDataType
}) => {
  const {
    actions: { setMainTitle },
  } = useContext(CommonContext)

  useLayoutEffect(() => {
    if (data && board) {
      setMainTitle(`${data.subject}|${board.name}`)
    }
  }, [data, board, setMainTitle])

  const confirmDialog = useConfirmDialog()
  const router = useRouter()

  const onDelete = useCallback(
    (e) => {
      e.preventDefault()
      if (!data) return

      confirmDialog({
        text: '정말 삭제하겠습니까?',
        confirmCallback: () => {
          router.push(`/board/delete/${data.seq}`)
        },
      })
    },
    [confirmDialog, data, router],
  )

  return (
    <CommonContainer board={board} data={data} mode="view">
      <BoardView board={board} data={data} onDelete={onDelete} />
    </CommonContainer>
  )
}

export default React.memo(ViewContainer)
