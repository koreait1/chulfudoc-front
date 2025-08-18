'use client'
import Link from 'next/link'
import useFetch from './_global/hooks/useFetch'
import DetectContainer from './detect/_containers/DetectContainer'

export default function MainPage() {
  const data = useFetch('http://localhost:4000/api/v1/member')
  console.log(data)
  return (
    <>
      <DetectContainer />
      <div className="links">
        {/* <Link href="/kakaomap/hospital" />
        <Link href="/kakaomap/aed" />
        버튼으로 만들어야하는지 링크로 할지 아직 모르겠음*/}
        <div className="board-link">
          <Link href="/board/notice" />
          <Link href="/board/freetalk" />
          <Link href="/board/exprience" />
        </div>
      </div>
    </>
  )
}
