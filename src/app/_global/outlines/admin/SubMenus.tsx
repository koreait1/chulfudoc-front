
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
  height: 45px;
  box-shadow: 2px 2px 5px ${dark};

  border-radius: 3px;
  margin-bottom: 25px;

  a {
    line-height: 45px;
    font-size: ${medium};
    padding: 0 25px;

    color: ${black};
    background-color: ${white};

    &.on {
      background: ${dark};
      color: ${white};
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
