'use client'
import React, { useMemo } from 'react'
import type { BoardViewType } from '../_types/BoardType'
import loadable from '@loadable/component'

const DefaultSkin = loadable(() => import('./skins/default/BoardView'))
const GallerySkin = loadable(() => import('./skins/gallery/BoardView'))

const BoardView = (props: BoardViewType) => {
  const { board } = props
  const Skin = useMemo(() => {
    const skin = board?.skin
    switch (skin) {
      case 'gallery':
        return GallerySkin
      default:
        return DefaultSkin
    }
  }, [board])
  return board && <Skin {...props} />
}

export default React.memo(BoardView)
