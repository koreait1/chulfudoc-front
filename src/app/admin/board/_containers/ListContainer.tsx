'use client'

import React, { useCallback, useState } from 'react'
import type { BoardConfigType } from '@/app/board/_types/BoardType'
import Pagination from '@/app/_global/components/Pagination'
import BoardItems from '../_components/BoardItems'
import BoardSearchForm from '../_components/BoardSearchForm'

type PropType = {
  items?: Array<BoardConfigType>
  pagination?: any
}

const ListContainer = ({ items, pagination }: PropType) => {
  /* 08.26. 4교시 */
  const [_items, setItems] = useState<Array<BoardConfigType> | undefined>(items)
  const onToggle = useCallback((bid) => {
    setItems((prevItems) =>
      prevItems?.map((item) =>
        item.bid === bid ? { ...item, chk: !Boolean(item.chk) } : item,
      ),
    )
  }, [])
  /* 08.26. 4교시 */
  return (
    <>
      <BoardSearchForm />
      <BoardItems items={_items} onToggle={onToggle} />
      <Pagination pagination={pagination} />
    </>
  )
}

export default React.memo(ListContainer)
