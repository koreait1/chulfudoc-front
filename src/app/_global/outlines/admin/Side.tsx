import React from 'react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import styled from 'styled-components'
import color from '../../styles/color'
import fontSize from '../../styles/fontsize'
import Link from 'next/link'
const { dark, white } = color
const { big } = fontSize

const StyledAside = styled.aside`
  background: #fdfdfd;
  min-width: 240px;
  border-right: 1px solid #eee;

  a {
    display: block;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    font-size: ${big};
    font-weight: 500;
    color: #333;
    border-bottom: 1px solid #f1f1f1;
    transition: background 0.2s ease, color 0.2s ease, padding-left 0.2s ease;

    &:hover {
      background: #fff8cc;
      color: #000;
      padding-left: 28px;
    }
  }

  a.on {
    background: #ffd93d;
    color: #000;
    font-weight: 600;
    border-left: 4px solid #ffa500;
    padding-left: 24px;
  }
`

const Side = () => {
  const urlPath = usePathname()
  return (
    <StyledAside>
      <Link
        href="/admin/membership"
        className={classNames({ on: urlPath.startsWith('/admin/membership') })}
      >
        회원 관리
      </Link>
      <Link
        href="/admin/board"
        className={classNames({ on: urlPath.startsWith('/admin/board') })}
      >
        게시판 관리
      </Link>
    </StyledAside>
  )
}

export default React.memo(Side)
