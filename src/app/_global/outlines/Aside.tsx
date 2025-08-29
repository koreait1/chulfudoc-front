import React from 'react'
import styled, { css } from 'styled-components'
import noad from '../assets/images/noad.png'

const StyledAside = styled.aside<{ bg?: string }>`
  ${({ bg }) =>
    bg &&
    css`
      background-image: url(${bg});
    `}
  width: 100px;
  height: 600px;
  position: fixed;
  top: 100px;
  border: 1px solid #ddd;
  background-color: #fafafa;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  &.rightAd {
    right: 10px;
  }
  &.leftAd {
    left: 10px;
  }
  ins {
    width: 100%;
    height: 100%;
    display: block;
  }
`
const Aside = ({ className }) => {
  return (
    <StyledAside className={className} bg={noad.src}>
      <ins />
    </StyledAside>
  )
}
export default React.memo(Aside)
