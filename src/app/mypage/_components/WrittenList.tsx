'use client'
import useUser from '@/app/_global/hooks/useUser'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'
import React from 'react'
import styled from 'styled-components'
const { normal, big } = fontSize
const { primary, dark } = color
const MyBoard = styled.ul`
  width: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${dark}15;
  border-radius: 20px;
  background: #eee;
  margin: 0 auto;
  li {
    width: 100%;
    padding: 5px 5%;
    font-size: ${normal};
    border: 1px soild ${dark}15;
    background: #fff;
    &:first-child {
      padding: 10px;
      width: 100%;
      background: ${primary};
      font-weight: bold;
      font-size: ${big};
      line-height: 1.5em;
      border-radius: 20px 20px 0 0;
    }
    &:nth-child(n + 3) {
      border-top: 1px solid ${dark}33;
    }
    &.noCon {
      font-style: italic;
      text-align: center;
    }
  }
  .written-data {
    padding: 10px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  > div {
    margin: 10px auto;
  }
`
const WrittenList = ({ children }) => {
  const { loggedMember } = useUser()
  return (
    <MyBoard>
      <li key={'title'}>{loggedMember.name}님이 작성하신 글</li>
      {children}
    </MyBoard>
  )
}

export default React.memo(WrittenList)
