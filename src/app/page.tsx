'use client'
import Link from 'next/link'
import LayerPopup from './_global/components/LayerPopup'
import GERMapContainer from '@/app/tmap/_containers/GERMapContainer'
import { useState } from 'react'
import { FaHospital } from 'react-icons/fa'

// 렌더링 속도를 맞추기 위한 조치 사항 회의 후 적용할지 판단 => 강사님께 질문해서 더 좋은 방안 찾아보기
//import DetectContainer from './detect/_containers/DetectContainer'
import dynamic from 'next/dynamic';
import Loading from './loading'
import MainContainer from './main/_container/MainContainer'
const DetectContainer = dynamic(() => import('./detect/_containers/DetectContainer'), {
  ssr: false, // 서버 렌더링 제외
  loading: () => <Loading />
});


export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
      <>
        <MainContainer>
          <DetectContainer />
          <h1>테스트</h1>
        </MainContainer>
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
