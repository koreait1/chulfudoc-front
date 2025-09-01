'use client'
import styled from 'styled-components'
import color from '../styles/color'
import fontSize from '../styles/fontsize'
const { primary } = color

type DropType = {
  children: React.ReactNode | string
  background?: string
  title?: string
}
const Wrap = styled.div`
  position: relative;
  display: inline-block;
  max-width: 75px;
  &:hover .drop {
    opacity: 1;
    transform: translateY(0);
  }
  > button {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    background: none;
    border: none;
  }
`
export const Drop = styled.div<DropType>`
  font-family: 'Noto Sans KR', sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-size: ${fontSize.normal};
  width: 115px;
  padding: 10px;
  padding-right: 15px;
  border-radius: 12px;
  position: absolute;
  top: calc(100% + 8px);
  left: calc(100% - 95px);
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.18s ease,
    transform 0.28s cubic-bezier(0.16, 0.84, 0.44, 1);
  will-change: transform, opacity;
  background: ${primary};
`

export const DropDown = ({ title, children }: DropType) => {
  return (
    <Wrap>
      <button type="button" className="btn">
        {title}
      </button>
      <Drop className="drop">{children}</Drop>
    </Wrap>
  )
}
