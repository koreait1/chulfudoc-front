'use client'
import styled, { css } from 'styled-components'
import color from '../styles/color'
import fontSize from '../styles/fontsize'
const { dark, info, gray, white, black, light } = color
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
  margin-top: 10px;
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
  
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none; // 마우스 이벤트 차단
      user-select: none; // 드래그 방지
      background-color: #f5f5f5; // 비활성화처럼 보이게
      color: #ccc;
    `}
`

export const Textarea = styled.textarea<CommonType>`
  ${commonStyle}
  height: 150px;
  resize: none;
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

  td {
    svg {
      font-size: 2rem;
      vertical-align: middle;
    }
    span.radio,
    span.checkbox {
      margin-right: 15px;
    }
  }

  & + & {
    margin-top: 30px;
  }
`

export const TableRows = styled.table`
  ${tableCommonStyle}
  thead {
    th {
      background: ${black};
      color: ${white};
      font-size: ${medium};
      height: 45px;
      padding: 0 10px;
    }
    th + th {
      border-left: 1px solid ${light};
    }
  }

  tbody {
    td {
      border-bottom: 1px solid #ccc;
      padding: 10px;
    }
  }
`
