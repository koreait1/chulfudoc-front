'use client'
import styled, { css } from 'styled-components'
import TitleType from '../types/TitleType'
import color from '../styles/color'
import fontsize from '../styles/fontsize'
import useTitle from '../hooks/useTitle'

const { extra } = fontsize
const { black } = color

const StyledMainTitle = styled.h1<TitleType>`
  font-size: ${extra};
  padding: 0 10px 15px;
  margin: 0;
  color: ${black};
  ${({ center }) =>
    center &&
    css`
      text-align: center;
    `}
  ${({ border, borderThickness }) =>
    border &&
    css`
      border-bottom: ${borderThickness || '3px'} solid ${black};
      margin-bottom: 25px;
    `}
`

export function MainTitle(props) {
  useTitle(props.children)

  return <StyledMainTitle {...props} />
}