'use client'
import Link from 'next/link'
import useFetch from './_global/hooks/useFetch'
import DetectContainer from './detect/_containers/DetectContainer'

import LayerPopup from './_global/components/LayerPopup'
import { useState } from 'react'
import MapContainer from './kakaomap/_containers/MapContainer'

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)
  const data = useFetch(`/member`)
  return (
    <>
      <DetectContainer />
      <div className="links">
        <button type="button" onClick={() => setIsOpen(true)}>
          병원 찾기
        </button>
        <LayerPopup
          isOpen={isOpen}
          title="병원 안내"
          onClose={() => setIsOpen(false)}
          width={'80%'}
          height={'60%'}
        >
          <MapContainer />
        </LayerPopup>
        <div className="board-link">
          <Link href="/board/notice" />
          <Link href="/board/freetalk" />
          <Link href="/board/exprience" />
        </div>
      </div>
    </>
  )
}
