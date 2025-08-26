'use client'
import React, { useCallback, useState, useRef } from 'react'
import DetectBox from '../_components/DetectBox'
import ERLContainer from '@/app/tmap/_containers/ERLContainer'
import webcam_disabled from '@/app/_global/assets/images/webcam_disabled.png'

type DetectionItem = {
  x1: number
  y1: number
  w: number
  h: number
}

const DetectContainer = () => {
  const [fallDetect, setFallDetect] = useState(false)
  const detectionCount = useRef<number[]>([])
  const lastDetectTime = useRef(0) // 연속 감지 방지 차원에서 넣음
  const [webcamAble, setWebcamAble] = useState(false)

  const detectCallback = useCallback((item: DetectionItem) => {
    console.log(item) // 감지 확인용 item

    const now = Date.now()

    // 너무 빠른 감지는 무시
    if (now - lastDetectTime.current < 1000) return
    lastDetectTime.current = now

    detectionCount.current.push(now)

    // 10초 이상 지난 기록 삭제
    detectionCount.current = detectionCount.current.filter(
      (time) => now - time <= 10000,
    )

    // 10초 안에 5번 이상 감지되면 fallDetect true
    if (detectionCount.current.length >= 5) {
      setFallDetect(true)
    }
  }, [])

  return (
    <>
      {<DetectBox width={640} height={640} callback={detectCallback} />}
      {fallDetect && <ERLContainer />}
    </>
  )
}

export default React.memo(DetectContainer)
