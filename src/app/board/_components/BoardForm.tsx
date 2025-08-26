import React, { useMemo } from 'react'
import loadable from '@loadable/component'
import type { BoardFormType } from '../_types/BoardType'

const DefaultSkin = loadable(() => import('./skins/default/BoardForm'))
const GallerySkin = loadable(() => import('./skins/gallery/BoardForm'))

const BoardForm = ({ board }: BoardFormType) => {
  const Skin = useMemo(() => {
    const { skin } = board
    switch (skin) {
      case 'gallery':
        return GallerySkin

      default:
        return DefaultSkin
    }
  }, [board])

  return <Skin board={board} />
}

export default React.memo(BoardForm)
