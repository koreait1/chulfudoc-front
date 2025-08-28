'use client'

import React from 'react'
import styled from 'styled-components'
import color from '../styles/color'
const { primary, dark } = color

const StyledFooter = styled.footer`
  min-height: 200px;
  background: ${primary}25;
  color: ${dark};
  font-size: 14px;
  padding: 30px 20px;
  line-height: 1.8;
`

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>철푸닥\chulfudoc | 대표자명 : 주용현</p>
        <p>주소 : 서울특별시 강서구 공항대로 200</p>
        <p>사업자등록번호 : -</p>
        <p>전화(고객센터) : 010-1234-5678</p>
        <p>이메일 : juyonghyeon@gmail.com</p>
        <p>
          홈페이지 : <a href="https://chulfudoc.xyz">chulfudoc.xyz</a> |
          관리자페이지 :{' '}
          <a href="https://admin.chulfudoc.xyz">admin.chulfudoc.xyz</a>
        </p>
      </div>
    </StyledFooter>
  )
}

export default React.memo(Footer)
