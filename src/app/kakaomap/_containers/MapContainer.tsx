'use client'
import KERLocate from '../../location/_components/KERLocate'
import ERMap from '../_components/ERMap'

export default function MapContainer() {
  return (
    <div>
      <h1>ER 위치 지도</h1>
      <ERMap />
      <h2>ER 위치 정보</h2>
      <KERLocate />
    </div>
  )
}
