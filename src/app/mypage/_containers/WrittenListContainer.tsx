import React from 'react'
import WrittenList from '../_components/WrittenList'
import WrittenData from '../_components/WrittenData'
const Written = () => {
  return (
    <WrittenList>
      <WrittenData />
    </WrittenList>
  )
}
export default React.memo(Written)
