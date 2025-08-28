'use client'
import Link from 'next/link'
import DetectContainer from './detect/_containers/DetectContainer'
import LayerPopup from './_global/components/LayerPopup'
import { useState } from 'react'
import GERMapContainer from '@/app/tmap/_containers/GERMapContainer'
import { FaHospital } from 'react-icons/fa'

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DetectContainer />
      <div className="links">
        <button type="button" onClick={() => setIsOpen(true)}>
          <h1>전국 응급의료기관</h1>
          <FaHospital size={150} />
        </button>
        <LayerPopup
          isOpen={isOpen}
          title="응급의료기관"
          onClose={() => setIsOpen(false)}
          width={'80%'}
          height={'800px'}
        >
          <GERMapContainer />
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
