'use client'
import React, { useCallback, useState, useRef, useEffect } from 'react'
import DetectBox from '../_components/DetectBox'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'

const { primary } = color
const { big } = fontSize

const DetectWrapper = styled.div`
  margin: 10px auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`

const WebcamButton = styled.div`
  font-family: "Anton", sans-serif;
  font-weight: 400;
  font-style: normal;
  z-index: 20;

  width: 150px;
  height: 45px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${primary};
  font-size: ${big};

  &:hover {
    background-color: #222;
    transform: scale(1.05);
  }
`

type DetectType = {
  webcamAble: boolean
  onChange: (item: any) => void
}

const DetectContainer = ({ webcamAble, onChange }:DetectType) => {

  const [fallDetect, setFallDetect] = useState(false)
  const detectionCount = useRef<number[]>([])
  const lastDetectTime = useRef(0)
  const router = useRouter()

  const detectCallback = useCallback(() => {
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

  const onDetectChange = useCallback(() => {
    const btnValue = !webcamAble
    onChange(btnValue)
  },[webcamAble, onChange]) 

  return (
    <DetectWrapper>
      {webcamAble ? (
        <>
          <DetectBox width={800} height={640} callback={detectCallback} />
          <WebcamButton onClick={onDetectChange}>
            WebCam Off
          </WebcamButton>
        </>
      ) : (
        <WebcamButton onClick={onDetectChange}>
          GET START
        </WebcamButton>
      )}
    </DetectWrapper>
  )
}

export default React.memo(DetectContainer)
