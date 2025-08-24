/* eslint-disable @next/next/no-sync-scripts */
'use client'
import React from 'react'

import TmapTest3 from './TmapTest3'

const Tmap = () => {
  return (
    <>
      <script src="https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=Zn5hqJeAaN1PnA3ovM8Y03NTGQ0uFQ3X7v1dl01M"></script>
      <TmapTest3 />
    </>
  )
}

export default React.memo(Tmap)
