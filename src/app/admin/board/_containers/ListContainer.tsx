'use client'

import React from 'react'
import type { BoardConfigType } from '@/app/board/_types/BoardType'
import Pagination from '@/app/_global/components/Pagination'

type PropType = {
  items?: Array<BoardConfigType>
  pagination?: any
}

const ListContainer = ({ items, pagination }: PropType) => {
  return (
    <>
      <Pagination pagination={pagination} />
    </>
  )
}

export default React.memo(ListContainer)
