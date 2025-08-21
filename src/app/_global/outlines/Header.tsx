'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { FiUserPlus, FiLogIn, FiLogOut } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { FaCog } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import lo13go from '../assets/images/lo13go.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/Buttons'
import useUser from '../hooks/useUser'
import LinkLoading from '../components/LinkLoading'
import LayerPopup from '../components/LayerPopup'

const StyledHeader = styled.header`
  background: #fff;

  .inner {
    display: flex;
    align-items: center;
    height: 120px;

    div {
      width: 0;
      flex-grow: 1;
      &.profile {
        margin-left: 80px;
        width: 40px;
        height: 40px;
        display: inline-block;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }

    .logo-section {
      text-align: center;
      .header-logo {
        height: 120px;
        width: auto;
      }
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 120px;

      a {
        margin-left: 5px;
      }
    }
  }
`

const Header = () => {
  const { isLogin, isAdmin, loggedMember } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="left"></div>
        <div className="logo-section">
          <Link href="/">
            <Image src={logo} alt="logo" className="header-logo" />
          </Link>
        </div>
        <div className="right">
          {isLogin ? (
            <>
              {/*
              <span>
                {loggedMember.name}({loggedMember.email})
              </span> */}
              <div className="profile">
                <Image
                  src={lo13go}
                  alt="썸네일"
                  onClick={() => setIsOpen(true)}
                />
                <LayerPopup
                  isOpen={isOpen}
                  title="회원명"
                  onClose={() => setIsOpen(false)}
                  top="28%"
                  left="70%"
                  width={'20%'}
                  height={'40%'}
                >
                  회원정보 <br />
                  etc
                  <Link href="/mypage" prefetch={false}>
                    <Button type="button">
                      <CgProfile />
                      마이페이지
                      <LinkLoading />
                    </Button>
                  </Link>
                </LayerPopup>
              </div>
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
              <Link href="/member/join" prefetch={false}>
                <Button type="button">
                  <FiUserPlus />
                  회원가입
                  <LinkLoading />
                </Button>
              </Link>
              <Link href="/member/login" prefetch={false}>
                <Button type="button" color="secondary">
                  <FiLogIn />
                  로그인
                  <LinkLoading />
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
