import React from 'react'
import styled from 'styled-components'
import { FiLogOut } from 'react-icons/fi'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/images/logo.png'
import { Button } from '../../components/Buttons'
import LinkLoading from '../../components/LinkLoading'
import useUser from '../../hooks/useUser'

const StyledHeader = styled.header`
  background: #fff;

  .inner {
    display: flex;
    align-items: center;
    height: 120px;
    border-bottom: 1px solid #c4c4c4ff;

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

    .badge {
      margin-right: 5px;
    }
  }
`

const Header = () => {
  const { loggedMember } = useUser()

  return (
    <StyledHeader>
      <div className="inner layout-width">
        <div className="left"></div>
        <div className="logo-section">
          <Link href="/admin">
            <Image src={logo} alt="logo" className="header-logo" />
          </Link>
        </div>
        <div className="right">
          <span className="badge">{loggedMember.name}님 환영합니다.</span>
          <a href="/member/api/logout">
            <Button type="button" color="secondary">
              <FiLogOut />
              로그아웃
            </Button>
          </a>
          <Link href="/" prefetch={false}>
            <Button type="button">
              <FaExternalLinkAlt />
              메인 페이지
              <LinkLoading />
            </Button>
          </Link>
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)
