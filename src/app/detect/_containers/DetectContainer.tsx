'use client'
import React, { useCallback, useState } from 'react'
import DetectBox from '../_components/DetectBox'
import HospitalItems from '../_components/HospitalItems'

const DetectContainer = () => {
  const [items, setItems] = useState([]) // 병원 목록
  const detectCallback = useCallback((item) => {
    // 쓰러진 사람이 감지된 경우 후속 처리 작업 - 위치 기반의 병원 조회
    //setItems(.....)
  }, [])
  return (
    <>
      <DetectBox width={640} height={640} callback={detectCallback} />
      <HospitalItems items={items} />
    </>
  )
}

export default React.memo(DetectContainer)