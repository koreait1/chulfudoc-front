'use client'
import React from 'react'
import styled, { css } from 'styled-components'

const StyledContentBox = styled.section<{
  children: React.ReactNode
  width?: number
}>`
  padding: 50px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`

const ContentBox = ({ children, width }): any => {
  return (
    <StyledContentBox className="layout-width" width={width}>
      {children}
    </StyledContentBox>
  )
}

export default React.memo(ContentBox)