'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CgProfile } from 'react-icons/cg'
import { FaCog } from 'react-icons/fa'
import logoWord from '../assets/images/logo-word.png'
import noprofile from '../assets/images/noprofile.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/Buttons'
import useUser from '../hooks/useUser'
import LinkLoading from '../components/LinkLoading'
import LayerPopup from '../components/LayerPopup'
import FileImages from '../components/FileImages'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { LuUserPen } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import color from '../styles/color'
import { DropDown } from '../components/DropDown'
const { dark } = color

const StyledHeader = styled.header`
  position: absolute;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #ffe66d, #ffd93d, #e6c235);
  border-bottom: 2px solid #ffe66d;
  border-radius: 12px;
  margin: 0 20px 0 20px;
  z-index: 999;

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    max-width: 100% !important;

    div {
      flex-grow: 1;
      .profile {
        flex-grow: 0;
        display: inline-block;
        width: 40px;
        height: 40px;
      }
    }

    .logo-section {
      display: flex;
      text-align: center;
      align-items: center;
      .header-logo {
        height: 45px;
        width: auto;
      }
      .linker {
        font-family: 'Noto Sans KR', sans-serif;
        font-optical-sizing: auto;
        font-weight: 700;
        font-style: normal;
        min-width: 75px;
        margin-left: 5px;
        padding: 5px;
        transition: transform 0.7s ease;
      }
      .linker:hover {
        transform: scale(1.2);
      }
    }

    .right {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      height: 45px;

      a {
        margin-left: 5px;
        button {
          margin: 0;
        }
      }
      ul,
      li {
        border-radius: 50%;
        display: inline-block;
        text-align: right;
        img {
          border: 2px solid ${dark};
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
    }
  }

  .modalProfile {
    ul,
    li {
      border-radius: 50%;
      display: inline-block;
      text-align: right;
      img {
        border: 3px solid ${dark};
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
  }
`

const LoginButton = styled(Button)`
  transition: all 0.2s ease;

  &:hover {
    background-color: #222;
    transform: scale(1.1);
    color: #ffd700;
  }
`
type ProfilePopup = {
  isOpen?: any
  setIsOpen?: any
}

const Header = ({ isOpen, setIsOpen }: ProfilePopup) => {
  const { isLogin, isAdmin, loggedMember } = useUser()
  const pathname = usePathname()

  const popProfileOpen = useCallback(() => {
    const btnValue = !isOpen
    setIsOpen(btnValue)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) setIsOpen(false) // 현재 주소가 변경될 때 페이지 내 실행되었던 모든 사항을 닫음 ex) 모달
  }, [pathname])
  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="logo-section">
          <Link href="/">
            <Image src={logoWord} alt="로고" className="header-logo" />
          </Link>
          <Link href="/mypage">
            <div className="linker">Mypage</div>
          </Link>
          <DropDown title="게시판">
            <Link href="/board/list/notice">
              <div className="linker">공지사항</div>
            </Link>
            <Link href="/board/list/freetalk">
              <div className="linker">자유게시판</div>
            </Link>
          </DropDown>
          <Link href="/search-er">
            <div className="linker">병원 검색</div>
          </Link>
        </div>

        <div className="right">
          {isLogin ? (
            <>
              {isAdmin && (
                <a href="/admin/membership">
                  <Button type="button" color="dark">
                    <FaCog />
                    사이트 관리
                  </Button>
                </a>
              )}
              <div className="profile">
                <div onClick={popProfileOpen}>
                  <FileImages
                    items={loggedMember.profileImage}
                    viewOnly={true}
                    viewOrgImage={false}
                    width={40}
                    height={40}
                    fallbackImage={noprofile}
                  />
                </div>
                <LayerPopup
                  isOpen={isOpen}
                  onClose={popProfileOpen}
                  top="270px"
                  right="180px"
                  width={'250px'}
                  height={'350px'}
                >
                  <FileImages
                    items={loggedMember.profileImage}
                    viewOnly={true}
                    viewOrgImage={false}
                    width={110}
                    height={110}
                    fallbackImage={noprofile}
                  />
                  <span>
                    <span>{loggedMember.name}</span> 님
                  </span>
                  <Link href="/mypage" prefetch={false}>
                    <Button type="button" width={'180px'}>
                      <CgProfile />
                      마이페이지
                      <LinkLoading />
                    </Button>
                  </Link>
                  <Link href="/mypage/profile" prefetch={false}>
                    <Button type="button" width={'180px'}>
                      <LuUserPen />
                      개인정보 수정
                      <LinkLoading />
                    </Button>
                  </Link>
                  <Link href="/member/api/logout">
                    <Button type="button" color="secondary" width={'180px'}>
                      <FiLogOut />
                      로그아웃
                    </Button>
                  </Link>
                </LayerPopup>
              </div>
            </>
          ) : (
            <>
              <Link href="/member/login" prefetch={false}>
                <LoginButton
                  type="button"
                  color="#000"
                  borderradius="25px"
                  style={{ marginRight: '20px' }}
                >
                  <FiLogIn style={{ color: 'currentColor' }} />
                  로그인
                </LoginButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)
