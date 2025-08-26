'use client'
import React from 'react'
import BoardForm from '../_components/BoardForm'
import type { BoardConfigType, BoardFormType } from '../_types/BoardType'

const UpdateContainer = ({ board }: BoardFormType) => {
  return <BoardForm board={board} />
}

export default React.memo(UpdateContainer)
