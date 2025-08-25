'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg'
import { FaCog } from 'react-icons/fa'
import logo from '../assets/images/logo.png'
import defaultImg from '../assets/images/lo13go.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/Buttons'
import useUser from '../hooks/useUser'
import LinkLoading from '../components/LinkLoading'
import LayerPopup from '../components/LayerPopup'
import FileImages from '../components/FileImages'
import { FiUserPlus, FiLogIn, FiLogOut } from 'react-icons/fi'
import noprofile from '../assets/images/noprofile.png'

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
        ul,
        li,
        img {
          box-sizing: border-box;
          border-radius: 50%;
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
        button {
          margin: 0;
        }
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
              <div className="profile" onClick={() => setIsOpen(true)}>
                {loggedMember.profileImage ? (
                  <FileImages
                    items={loggedMember.profileImage}
                    viewOnly={true}
                    viewOrgImage={false}
                    width={40}
                    height={40}
                    fallbackImage={noprofile}
                  />
                ) : (
                  <ul>
                    <li>
                      <Image src={defaultImg} alt="기본프로필" />
                    </li>
                  </ul>
                )}
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
