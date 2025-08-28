'use client'
import useUser from '@/app/_global/hooks/useUser'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'
import React from 'react'
import styled from 'styled-components'
const { normal, big } = fontSize
const { primary, dark } = color
const MyBoard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${dark}15;
  border-radius: 20px;
  li {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    font-size: ${normal};
    border: 1px soild ${dark}15;
    &:first-child {
      width: 100%;
      background: ${primary};
      font-weight: bold;
      font-size: ${big};
      line-height: 1.5em;
      border-radius: 20px 20px 0 0;
    }
    &:nth-child(n + 3) {
      border-top: 1px solid ${dark};
    }
    &.noCon {
      font-style: italic;
      text-align: center;
    }
  }
`
const WrittenList = ({ children }) => {
  const { loggedMember } = useUser()
  return (
    <MyBoard>
      <li>{loggedMember.name}님이 작성하신 글</li>
      {children}
    </MyBoard>
  )
}

export default React.memo(WrittenList)
