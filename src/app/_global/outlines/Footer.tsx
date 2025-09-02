'use client'

import React from 'react'
import styled from 'styled-components'
import color from '../styles/color'
const { dark, light } = color

const StyledFooter = styled.footer`
  min-height: 140px;
  background: #1a1a1a;
  color: ${light};
  font-size: 14px;
  padding: 30px 20px;
  line-height: 1.8;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  hr {
    border: none;
    border-top: 1px solid #333;
    margin: 15px auto;
    width: 80%;
  }

  .corp {
    margin-top: 5px;
    font-size: 12px;
    color: #aaa;
    letter-spacing: 1px;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>철푸닥 - chulfudoc | 대표 : 주용현</p>
        <p>고객센터 : 010-1234-5678 | 이메일 : juyonghyeon@gmail.com</p>
        <p>홈페이지 : chulfudoc.xyz | 관리자 : admin.chulfudoc.xyz </p>
      </div>
      <hr />
      <div className="corp">© 2025 chulfudoc Corp. All rights reserved.</div>
    </StyledFooter>
  )
}

export default React.memo(Footer)
