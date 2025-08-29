import React from 'react'
import styled from 'styled-components'

const StyledAside = styled.aside`
  width: 100px;
  height: 600px;
  position: fixed;
  top: 100px;
  border: 1px solid #ddd;
  background: #fff;
  translation: all 0.5s;
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
    <StyledAside className={className}>
      <ins />
    </StyledAside>
  )
}
export default React.memo(Aside)
