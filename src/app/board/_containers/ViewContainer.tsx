'use client'
import React, { useContext, useLayoutEffect } from 'react'
import type { BoardConfigType, BoardDataType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import BoardView from '../_components/BoardView'
import CommonContext from '@/app/_global/contexts/CommonContext'

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
      setMainTitle(`${data?.subject}|${board.name}`)
    }
  }, [data, board, setMainTitle])

  return (
    <CommonContainer board={board} data={data}>
      <BoardView board={board} data={data} />
    </CommonContainer>
  )
}

export default React.memo(ViewContainer)
