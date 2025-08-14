'use client'
import React from 'react'
import styled from 'styled-components'
import { FiUserPlus, FiLogIn, FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { FaCog } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/Buttons'
import useUser from '../hooks/useUser'

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
  const { isLogin, isAdmin, loggedMember } = useUser()
  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="left"></div>
        <div className="logo-section">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <div className="right">
          {isLogin ? (
            <>
              {/*
              <span>
                {loggedMember.name}({loggedMember.email})
              </span> */}
              <Link href="/mypage">
                <Button type="button">
                  <CgProfile />
                  마이페이지
                </Button>
              </Link>
              <a href="/member/api/logout">
                <Button type="button" color="secondary">
                  <FiLogOut />
                  로그아웃
                </Button>
              </a>
              {isAdmin && (
                <a href="/admin">
                  <Button type="button" color="info">
                    <FaCog />
                    사이트 관리
                  </Button>
                </a>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)