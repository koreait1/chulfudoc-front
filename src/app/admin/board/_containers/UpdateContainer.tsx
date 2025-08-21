'use client'
import React from 'react'
import BoardConfigForm from '../_components/BoardConfigForm'
type PropType = {
  bid?: string
}
const UpdateContainer = ({ bid }: PropType) => {
  return <BoardConfigForm />
}
export default React.memo(UpdateContainer)
