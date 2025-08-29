'use client'
import React, { useCallback, useState } from 'react'
import MemberItems, { MemberType } from '../_component/MemberItems'
import MemberSearchForm from '../_component/MemberSearchForm'
import Pagination from '@/app/_global/components/Pagination'

type Row = MemberType & { chk?: boolean }
type PropType = { items?: Array<MemberType>; pagination?: any; search?: any }

const ListContainer = ({ items, pagination, search }: PropType) => {
  const [_items, setItems] = useState<Array<Row> | undefined>(
    items?.map((it) => ({ ...it, chk: false })),
  )
  const [isCheckAll, setCheckAll] = useState(false)

  const onToggle = useCallback((memberId?: string, mode?: 'check' | 'uncheck') => {
    setItems((prev) => {
      if (!prev) return prev
      if (mode) {
        const checked = mode === 'check'
        setCheckAll(checked)
        return prev.map((row) => ({ ...row, chk: checked }))
      }
      const next = prev.map((row) =>
        row.puuid === memberId ? { ...row, chk: !Boolean(row.chk) } : row,
      )
      const totalChecked = next.reduce((acc, r) => acc + (r.chk ? 1 : 0), 0)
      setCheckAll(totalChecked === next.length)
      return next
    })
  }, [])

  return (
    <>
      <MemberSearchForm search={search ?? {}} />
      <MemberItems items={_items} onToggle={onToggle} isCheckAll={isCheckAll} />
      <Pagination pagination={pagination} />
    </>
  )
}

export default React.memo(ListContainer)
