'use client'
import styled from 'styled-components'
import Header from '../outlines/Header'
import { useState } from 'react'

const Content = styled.main`
  padding-top: 90px;
  min-height: calc(100vh - 310px);
`

export default function Contents({ children }) {
  const [profileOpen, setProfileOpen] = useState(false)
  return (
    <>
      <Header isOpen={profileOpen} setIsOpen={setProfileOpen} />
      <Content>{children}</Content>
    </>
  )
}
