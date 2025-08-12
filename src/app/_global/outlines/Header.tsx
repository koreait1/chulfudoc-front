'use client'

import React from 'react'
import styled from 'styled-components'
import logo1 from '@/app/_global/assets/images/logo1.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/Buttons'
/* 나중에 바꿉시다 */
import { FiUserPlus, FiLogIn } from 'react-icons/fi'

const StyledHeader = styled.header`
  background: #fff;

  .inner {
    display: flex;
    align-items: center;
    height: 120px;

    div {
      width: 0;
      flex-grow: 1;
    }

    .logo-section {
      text-align: center;

      .header-logo {
        height: 120px;
        width: auto;
      }
    }

    .right {
      text-align: right;

      a + a {
        margin-left: 5px;
      }
    }
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="left"></div>
        <div className="logo-section">
          <Link href="/">
            <Image src={logo1} alt="logo" className="header-logo" />
          </Link>
        </div>
        <div className="right">
          <Link href="/member/join">
            <Button type="button">
              <FiUserPlus />
              회원가입
            </Button>
          </Link>
          <Link href="/member/login">
            <Button type="button" color="secondary">
              <FiLogIn />
              로그인
            </Button>
          </Link>
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)