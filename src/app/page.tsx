'use client'
import Link from 'next/link'
import useFetch from './_global/hooks/useFetch'
import DetectContainer from './detect/_containers/DetectContainer'

import { Button } from './_global/components/Buttons'
import LayerPopup from './_global/components/LayerPopup'
import { useCallback, useState } from 'react'

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)
  const data = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/member`)
  return (
    <>
      <DetectContainer />
      <button type="button" onClick={() => setIsOpen(true)}>
        열기
      </button>
      <LayerPopup
        isOpen={isOpen}
        title="xptmxm"
        onClose={() => setIsOpen(false)}
      >
        sodyd
      </LayerPopup>
      <div className="links">
        <Button width={'40%'}>병원 찾기</Button>
        <div className="board-link">
          <Link href="/board/notice" />
          <Link href="/board/freetalk" />
          <Link href="/board/exprience" />
        </div>
      </div>
    </>
  )
}
