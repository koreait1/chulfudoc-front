'use client'
import styled, { css } from 'styled-components'
import color from '../styles/color'
import fontSize from '../styles/fontsize'
const { dark, info, gray } = color
const { medium } = fontSize

const commonStyle = css`
  color: ${dark};
  border: 1px solid ${gray};
  font-size: ${medium};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  &:hover,
  &:focus {
    border-color: ${info};
  }

  &::placeholder {
    color: ${gray};
  }

  & ~ & {
    margin-top: 15px;
  }
`

type CommonType = {
  children?: React.ReactNode
  width?: number
  height?: number
}

export const Input = styled.input<CommonType>`
  ${commonStyle}
  maring-top: 10px;
  height: 50px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}
`

export const Textarea = styled.textarea<CommonType>`
  ${commonStyle}
  height: 150px;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}
`

const tableCommonStyle = css`
  border-spacing: 0;
  padding: 0;
  margin: 0;
  width: 100%;
`
type TableType = {
  thwidth?: number
}

export const TableCols = styled.table<TableType>`
  ${tableCommonStyle}
  th, td {
    border-bottom: 1px solid #ccc;
    padding: 8px 10px;
  }
  th {
    background: #f8f8f8;
    border-right: 1px solid #ccc;
    width: ${({ thwidth }) => (thwidth ? thwidth : 120)}px;
  }
  tr:first-of-type {
    th,
    td {
      border-top: 1px solid #ccc;
    }
  }
`
