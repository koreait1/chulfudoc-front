/* eslint-disable @next/next/no-sync-scripts */
'use client'
import React, { useEffect } from 'react'

declare global {
  interface Window {
    Tmapv3: any
  }
}

type MapProps = {
  id?: string
  center: { lat: number; lng: number }
  zoom?: number
  width?: string
  height?: string
}

const Map: React.FC<MapProps> = ({
  id = 'map_div',
  center,
  zoom = 16,
  width = '100%',
  height = '400px',
}) => {
  useEffect(() => {
    const { Tmapv3 } = window
    if (!Tmapv3) return

    new Tmapv3.Map(id, {
      center: new Tmapv3.LatLng(center.lat, center.lng),
      width,
      height,
      zoom,
    })
  }, [id, center, zoom, width, height])

  return <div id={id} style={{ width, height }} />
}

export default React.memo(Map)
