import React, { useMemo } from 'react'
import loadable from '@loadable/component'
import type { BoardListType } from '../_types/BoardType'

const DefaultSkin = loadable(() => import('./skins/default/BoardList'))
const GallerySkin = loadable(() => import('./skins/gallery/BoardList'))

const BoardList = ({ board }: BoardListType) => {
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

export default React.memo(BoardList)
