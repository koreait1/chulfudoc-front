'use client'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import DetectBox from '../_components/DetectBox'
import webcam_disabled from '@/app/_global/assets/images/webcam_disabled.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const DetectWrapper = styled('div').withConfig({
  shouldForwardProp: (prop) => prop !== 'fallDetect', // DOM으로 전달하지 않음
})<{ fallDetect?: boolean }>`
  width: 640px;
  height: 640px;
  cursor: pointer;
  border: 2px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0 auto 20px;
  position: relative;

  &:hover {
    border-color: #888;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
  }

  ${({ fallDetect }) =>
    fallDetect &&
    `
    &:hover::after {
      content: "웹캠 닫기";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 12px;
      opacity: 0;
      animation: fadeIn 0.3s forwards;
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }
  `}
`

type DetectionItem = {
  x1: number
  y1: number
  w: number
  h: number
}

const DetectContainer = () => {
  const [fallDetect, setFallDetect] = useState(false)
  const detectionCount = useRef<number[]>([])
  const lastDetectTime = useRef(0) // 연속 감지 방지
  const [webcamAble, setWebcamAble] = useState(false)
  const router = useRouter()

  const detectCallback = useCallback((item: DetectionItem) => {
    console.log(item)

    const now = Date.now()
    if (now - lastDetectTime.current < 1000) return
    lastDetectTime.current = now

    detectionCount.current.push(now)
    detectionCount.current = detectionCount.current.filter(
      (time) => now - time <= 10000,
    )

    if (detectionCount.current.length >= 5) {
      setFallDetect(true)
    }
  }, [])

  useEffect(() => {
    if (fallDetect) {
      router.push('/tmap')
    }
  }, [fallDetect, router])

  return (
    <DetectWrapper
      fallDetect={fallDetect}
      onClick={() => setWebcamAble((prev) => !prev)}
    >
      {webcamAble ? (
        <DetectBox width={640} height={640} callback={detectCallback} />
      ) : (
        <Image
          src={webcam_disabled}
          alt="웹캠 비활성화"
          width={640}
          height={640}
        />
      )}
    </DetectWrapper>
  )
}

export default React.memo(DetectContainer)
