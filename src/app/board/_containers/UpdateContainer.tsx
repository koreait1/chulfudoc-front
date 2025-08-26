'use client'
import React from 'react'

import BoardForm from '../_components/BoardForm'
import type { BoardFormType } from '../_types/BoardType'
import CommonContainer from '../_wrappers/CommonContainer'

const UpdateContainer = ({ board }: BoardFormType) => {
  return (
    <CommonContainer board={board}>
      <BoardForm board={board} />
    </CommonContainer>
  )
}

export default React.memo(UpdateContainer)
