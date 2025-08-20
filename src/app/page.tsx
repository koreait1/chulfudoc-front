'use client'
import Link from 'next/link'
import DetectContainer from './detect/_containers/DetectContainer'

import { Button } from './_global/components/Buttons'

export default function MainPage() {
  return (
    <>
      <DetectContainer />
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
