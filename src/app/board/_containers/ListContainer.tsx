'use client'
import React from 'react'
import type { BoardListType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'
import BoardList from '../_components/BoardList'
import Pagination from '@/app/_global/components/Pagination'

const ListContainer = ({ board, items, pagination }: BoardListType) => {
  return (
    <CommonContainer board={board}>
      <BoardList board={board} items={items} />
      <Pagination pagination={pagination} />
    </CommonContainer>
  )
}

export default React.memo(ListContainer)
