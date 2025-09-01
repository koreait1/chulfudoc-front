import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useMenu from '../../hooks/useMenu'
import classNames from 'classnames'
import color from '../../styles/color'
import fontSize from '../../styles/fontsize'

const { medium } = fontSize
const { dark, black, white } = color

const StyledSubMenu = styled.nav`
  display: flex;
  align-items: center;
  height: 48px;
  margin: 20px 0;
  padding: 30px 10px;
  border: 1px solid #ffe89a;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);

  a {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0 20px;
    margin: 0 4px;
    font-size: ${medium};
    font-weight: 600;
    color: #212529;
    border-radius: 18px;
    border: 1px solid transparent;
    background: #ffffff;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      background: #fffcee;
      border-color: #ffe89a;
    }

    &.on {
      background: #ffd93d;
      border-color: #ffd93d;
      color: #000000;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
  }
`

const SubMenu = () => {
  const items = useMenu()
  const pathname = usePathname()

  return (
    items.length > 0 && (
      <StyledSubMenu>
        {items.map(({ link, text }, i) => (
          <Link
            href={link}
            key={link + '-' + i}
            className={classNames('menu', { on: pathname === link })}
          >
            {text}
          </Link>
        ))}
      </StyledSubMenu>
    )
  )
}

export default React.memo(SubMenu)
