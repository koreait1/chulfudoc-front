'use client'
import React, { useEffect, useState } from 'react'
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
import { IoCall } from 'react-icons/io5'
import { LuUserPen } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import color from '../styles/color'
const { dark } = color

const StyledHeader = styled.header`
  background: #ffd93d;
  border-radius: 12px;
  margin: 15px 20px 0 20px;

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
      text-align: left;
      align-items: center;
      .header-logo {
        height: 45px;
        width: auto;
      }
      .linker {
        min-width: 75px;
        margin-left: 5px;
        padding: 5px;
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
          border: 3px solid ${dark};
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
const Header = () => {
  const { isLogin, isAdmin, loggedMember } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
          <Link href="/">
            <div className="linker">Mypage</div>
          </Link>
          <Link href="/">
            <div className="linker">게시판</div>
          </Link>
          <Link href="/maptest2">
            <div className="linker">병원 검색</div>
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
              <div className="profile">
                <div onClick={() => setIsOpen(true)}>
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
                  onClose={() => setIsOpen(false)}
                  top="270px"
                  right=" max(200px, calc(200px + (50vw - 575px))"
                  width={'300px'}
                  height={'470px'}
                >
                  <FileImages
                    items={loggedMember.profileImage}
                    viewOnly={true}
                    viewOrgImage={false}
                    width={230}
                    height={230}
                    fallbackImage={noprofile}
                  />
                  <span>
                    <span>{loggedMember.name}</span> 님
                  </span>
                  <Link href="/mypage" prefetch={false}>
                    <Button type="button" width={'230px'}>
                      <CgProfile />
                      마이페이지
                      <LinkLoading />
                    </Button>
                  </Link>
                  <Link href="/mypage" prefetch={false}>
                    <Button type="button" width={'230px'}>
                      <LuUserPen />
                      개인정보 수정
                      <LinkLoading />
                    </Button>
                  </Link>
                  <Link href="/mypage" prefetch={false}>
                    <Button type="button" width={'230px'}>
                      <IoCall />
                      문의하기
                      <LinkLoading />
                    </Button>
                  </Link>
                </LayerPopup>
              </div>
            </>
          ) : (
            <>
              <Link href="/member/login" prefetch={false}>
                <Button
                  type="button"
                  color="#111827"
                  borderradius="25px"
                  style={{ marginRight: 'px' }}
                >
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
