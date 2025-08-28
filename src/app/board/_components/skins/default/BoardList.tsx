import React from 'react'
import type { BoardListType } from '@/app/board/_types/BoardType'
import BoardListItems from './BoardListItems'

const BoardList = ({ board, items }: BoardListType) => {
  return <BoardListItems items={items}></BoardListItems>
}

export default React.memo(BoardList)
