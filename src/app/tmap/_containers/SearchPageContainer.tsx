'use client'
import React, { useState } from 'react'
import styled from 'styled-components'
import { MdMap, MdList } from 'react-icons/md'
import SearchMapContainer from './SearchMapContainer'
import SearchERInfoContainer from './SearchInfoContainer'
import { MemberPageWrapper } from '@/app/member/_components/MemberStyleWrapper'

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  position: relative;
`

const ToggleButton = styled.button`
  position: relative; // z-index 적용 가능
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin: 0 auto 16px auto;
  padding: 10px 20px;
  background-color: #4A5568;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2D3748;
  }

  svg {
    font-size: 1.2rem;
  }
`


// 슬라이드 패널
const Panel = styled('div').withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
  margin-top: 100px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: all 0.5s ease;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => (active ? 'translateX(0)' : 'translateX(20px)')};
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  min-width: 700px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  background: #fff;
  padding: 16px;
`

export default function SearchPageContainer() {
  const [showMap, setShowMap] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [option, setOption] = useState<'ALL' | 'NAME' | 'ADDR'>('ALL')

  return (
    <>
      <MemberPageWrapper />
      <Container>
        <ToggleButton onClick={() => setShowMap(!showMap)}>
          {showMap ? <MdList size="25" /> : <MdMap size="25" />}
          {showMap ? '목록 보기' : '지도 보기'}
        </ToggleButton>

        <Panel active={showMap}>
          <SearchMapContainer initialKeyword={keyword} initialOption={option} />
        </Panel>

        <Panel active={!showMap}>
          <SearchERInfoContainer initialKeyword={keyword} initialOption={option} />
        </Panel>
      </Container>
    </>
  )
}
