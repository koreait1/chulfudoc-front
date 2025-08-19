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
import color from '../../styles/color'

const { info } = color

const StyledHeader = styled.header`
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;

  .badge {
    background: ${info};
    padding: 5px 10px;
    border-radius: 5px;
  }

  .inner {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #bbbbbbff;
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
      display: flex;
      min-width: 0;

      a {
        margin-left: 5px;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
      }
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
          <Link href="/">
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
              사이트 메인
              <LinkLoading />
            </Button>
          </Link>
        </div>
      </div>
    </StyledHeader>
  )
}

export default React.memo(Header)
