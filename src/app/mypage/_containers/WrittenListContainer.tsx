import React from 'react'
import WrittenList from '../_components/WrittenList'
import WrittenData from '../_components/WrittenData'
import Pagination from '@/app/_global/components/Pagination'
const Written = () => {
  return (
    <WrittenList>
      <WrittenData />
    </WrittenList>
  )
}
export default React.memo(Written)
