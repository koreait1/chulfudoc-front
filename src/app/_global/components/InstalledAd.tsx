'use client'
import React from 'react'
import styled from 'styled-components'
const Ins = styled.ins`
  display: inline-block;
  width: 728px;
  height: 90px;
`
const InstalledAd = () => {
  return (
    <Ins
      className="adsbygoogle"
      data-ad-client="ca-pub-1234567890123456"
      data-ad-slot="1234567890"
    ></Ins>
  )
}
export default React.memo(InstalledAd)
