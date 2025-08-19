import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import useMenu from '../../hooks/useMenu'

const StyledSubMenu = styled.nav``

const SubMenu = () => {
  const items = useMenu()

  return (
    <StyledSubMenu>
      {items.length > 0 &&
        items.map(({ link, text }, i) => (
          <Link href={link} key={link + '-' + i}>
            {text}
          </Link>
        ))}
    </StyledSubMenu>
  )
}

export default React.memo(SubMenu)
