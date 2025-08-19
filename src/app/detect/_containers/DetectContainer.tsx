'use client'
import React, { useCallback, useState, useRef } from 'react'
import DetectBox from '../_components/DetectBox'
import KERLocate from '@/app/location/_components/KERLocate'

type DetectionItem = {
  x1: number
  y1: number
  w: number
  h: number
}

const DetectContainer = () => {
  const [fallDetect, setFallDetect] = useState(false)
  const detectionTimestamps = useRef<number[]>([])

  const detectCallback = useCallback((item: DetectionItem) => {
    const now = Date.now()
    detectionTimestamps.current.push(now)

    // 10초 이상 지난 기록 삭제
    detectionTimestamps.current = detectionTimestamps.current.filter(
      (time) => now - time <= 10000,
    )

    // 10초 안에 5번 이상 감지되면 fallDetect true
    if (detectionTimestamps.current.length >= 5) {
      setFallDetect(true)
    }
  }, [])

  return (
    <>
      <DetectBox width={640} height={640} callback={detectCallback} />
      {fallDetect && <KERLocate />}
    </>
  )
}

export default React.memo(DetectContainer)