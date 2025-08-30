'use client'
import styled from "styled-components";

const Content = styled.main`
  padding-top: 90px;
  min-height: calc(100vh - 310px);
`

export default function Contents({children}) {
  return <Content>{children}</Content>
}