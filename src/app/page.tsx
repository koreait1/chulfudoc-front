'use client'
import Link from 'next/link'
import LayerPopup from './_global/components/LayerPopup'
import emergency_center from '@/app/_global/assets/images/emergency_center.png'
import Image from 'next/image'
import GERMapContainer from '@/app/tmap/_containers/GERMapContainer'
import { useState } from 'react'

// 렌더링 속도를 맞추기 위한 조치 사항 회의 후 적용할지 판단 => 강사님께 질문해서 더 좋은 방안 찾아보기
//import DetectContainer from './detect/_containers/DetectContainer'
import styled, { createGlobalStyle } from 'styled-components'
import dynamic from 'next/dynamic';
import Loading from './loading'
const DetectContainer = dynamic(() => import('./detect/_containers/DetectContainer'), {
  ssr: false, // 서버 렌더링 제외
  loading: () => <Loading />
});

const PageWrapper = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

  body{
    background-color: #FFF8E1;
  }
`
const PageMain = styled.h1`
  font-family: "Anton", sans-serif;
  font-weight: 1000;
  font-style: normal;
  font-size: 8rem;

  line-height: 1;
  color: #E6C200;
  text-align: center;
  letter-spacing: -0.05em;

  margin: 0;
  text-shadow: 2px 2px 0 #888888;

  @media (max-width: 1150px) {
    font-size: 5.5rem;
  }

  @media (max-width: 768px) {
    font-size: 5rem;
  }

  .highlight {
    font-size: 9rem;
    color: #2E2E2E;
  }
`

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
      <>
        <PageWrapper />
        <PageMain>SAFETY<br/><span className="highlight">where</span><br/>YOU are</PageMain>
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
      </>
  )
}
