'use client'
import Link from 'next/link'
import DetectContainer from './detect/_containers/DetectContainer'
import LayerPopup from './_global/components/LayerPopup'
import emergency_center from '@/app/_global/assets/images/emergency_center.png'
import Image from 'next/image'
import GERMapContainer from '@/app/tmap/_containers/GERMapContainer'
import FloatingIcon from './_global/components/FloatingIcon'
import { useState } from 'react'
import { GoMoveToTop } from "react-icons/go";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <DetectContainer />
      <div className="links">
        <button type="button" onClick={() => setIsOpen(true)}>
          <h1>응급의료기관 찾아보기</h1>
          <Image
            src={emergency_center}
            alt="병원 찾기"
            width={320}
            height={160}
          ></Image>
        </button>
        <LayerPopup
          isOpen={isOpen}
          title="병원 안내"
          onClose={() => setIsOpen(false)}
          width={'80%'}
          height={'60%'}
        >
          <GERMapContainer />
        </LayerPopup>
        <div className="board-link">
          <Link href="/board/notice" />
          <Link href="/board/freetalk" />
          <Link href="/board/exprience" />
        </div>
      </div>
      <FloatingIcon bottom={30}>
        <GoMoveToTop style={{ width: '25px', height: 'auto' }} />
      </FloatingIcon>
      <FloatingIcon bottom={100}/>
    </>
  )
}
