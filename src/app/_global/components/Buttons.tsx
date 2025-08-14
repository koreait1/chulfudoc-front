'use client'
import styled, { css } from 'styled-components'
import ButtonType from '../types/ButtonType'
import color from '../styles/color'
import fontSize from '../styles/fontsize'

const commonStyle = css`
  width: 120px;
  height: 40px;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
  & + & {
    margin-left: 5px;
  }

  svg {
    margin-right: 10px;
  }
`

export const Button = styled.button<ButtonType>`
  ${commonStyle}
  ${({ width }) =>
    width &&
    css`
      width: ${typeof width === 'string' ? width : width + 'px'};
    `}
    ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

    ${({ color: c }) => {
    c = c ?? 'primary'
    const _color = color[c] ? color[c] : c
    return css`
      background: ${_color};
    `
  }}
    
    ${({ fontSize: size }) => {
    size = size ?? 'medium'
    return css`
      font-size: ${fontSize[size] ?? size};
      svg {
        font-size: ${fontSize[size] ?? size};
      }
    `
  }}

  ${({ fontcolor }) => {
    fontcolor = fontcolor ?? 'light'

    return css`
      color: ${color[fontcolor] ?? fontcolor};
      svg {
        color: ${color[fontcolor] ?? fontcolor};
      }
    `
  }}
`

export const SubmitButton = (props) => {
  return (
    <Button {...props} width="100%" height={60} fontSize="extra" className='btn'>
      {props.children}
    </Button>
  )
}
