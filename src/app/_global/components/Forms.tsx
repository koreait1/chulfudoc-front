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
    &:hover, &:focus {
        border-color: ${info};
    }
    
    &::placeholder{
      color: ${gray};
    }

    & + & {
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
