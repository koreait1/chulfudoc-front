/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import styled, { css } from 'styled-components'

const ContentBox = ({ children, className, width }) => {
  return (
    <section className={'layout-width ' + className} width={width}>
      {children}
    </section>
  )
}

const StyledContentBox = styled<any>(ContentBox)`
  padding: 50px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`

export default React.memo(StyledContentBox)