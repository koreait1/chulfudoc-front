'use client'
import React from 'react'
import type { BoardConfigType, BoardDataType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import BoardView from '../_components/BoardView'

const ViewContainer = ({
  board,
  data,
}: {
  board?: BoardConfigType
  data?: BoardDataType
}) => {
  return (
    <CommonContainer board={board} data={data}>
      <BoardView board={board} data={data} />
    </CommonContainer>
  )
}

export default React.memo(ViewContainer)
