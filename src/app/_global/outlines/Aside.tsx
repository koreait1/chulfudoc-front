'use client'

import React from 'react'
import styled from 'styled-components'

const StyledAside = styled.aside`
  width: 100px;
  height: 600px;
  position: fixed;
  top: 100px;
  &.right {
    rigth: 10px;
  }
  &.left {
    left: 10px;
  }
`
const Aside = ({ className }) => {
  return (
    <StyledAside className={className}>
      <ins />
    </StyledAside>
  )
}
export default React.memo(Aside)
