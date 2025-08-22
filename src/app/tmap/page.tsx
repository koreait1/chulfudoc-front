'use client'

import ERMapTMapV3 from './_components/ERMapTMapV3'
import ERLocation from "./_components/ERLocation"

export default function TMapPage() {
  return (
    <div>
      <h1>ER 위치 지도</h1>
      <ERMapTMapV3 />
      <h1>ER 위치 정보</h1>
      <ERLocation />
    </div>
  )
}
