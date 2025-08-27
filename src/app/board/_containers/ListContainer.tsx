'use client'
import React from 'react'
import type { BoardListType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import BoardList from '../_components/BoardList'

const ListContainer = ({ board }: BoardListType) => {
  return (
    <CommonContainer board={board}>
      <BoardList board={board} />
    </CommonContainer>
  )
}

export default React.memo(ListContainer)
