'use client'
import React, { useRef, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import LayerPopup from '@/app/_global/components/LayerPopup'

type WrapperType = {
  children: React.ReactNode
  width?: number
  height?: number
}

const Wrapper = styled.div<WrapperType>`
  position: relative;
  ${({ width }) => width ?? 640}px;
  ${({ height }) => height ?? 480}px;
  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
`
/**
 *
 * @param callback : 위험 감지시 호출되는 후속 처리 콜백 함수
 * @returns
 */
const DetectBox = ({ width, height, callback }) => {
  const [guideOpen, setGuideOpen] = useState<boolean>(false)
  const dialogRef = useRef<boolean>(false)
  const alertDialog = useAlertDialog()
  const router = useRouter()

  width = width ?? 640
  height = height ?? 480

  // 카메라 권한 설정 안내 팝업 닫기
  const onPopupClose = useCallback(() => {
    setGuideOpen(false)
    router.replace('/')
  }, [router])

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const layerRef = useRef<HTMLCanvasElement | null>(null)

  const monitor = useCallback(() => {
    const canvas = canvasRef.current
    const layer = layerRef.current
    if (!canvas || !layer) return

    const ctx = layer.getContext('2d')
    if (ctx) {
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#f00'
    }
    canvas.toBlob((blob) => {
      const formData = new FormData()
      if (blob) {
        formData.append('file', blob, 'canvas.jpg')

        fetch(`${process.env.NEXT_PUBLIC_AI_API_URL}`, {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((items) => {
            if (!items || !items.length) {
              return
            }

            ctx?.clearRect(0, 0, layer.width, layer.height)
            for (const item of items) {
              const [x1, y1, x2, y2, _, cls] = item
              console.log(_, ',', cls)
              // 쓰러진 경우가 아니라면 건너띄기
              if (cls !== 1) continue

              const w = Math.abs(x2 - x1)
              const h = Math.abs(y2 - y1)

              ctx?.strokeRect(x1, y1, w, h)

              if (typeof callback === 'function') {
                callback({ x1, y1, w, h })
              }
            }
          })
      }
    })
  }, [canvasRef, layerRef, callback])

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    let videoInterval, monitorInterval
    navigator.mediaDevices
      .getUserMedia({
        video: { width, height },
        audio: false,
      })
      .then((stream) => {
        if (video) video.srcObject = stream

        monitorInterval = setInterval(() => {
          monitor()
        }, 1000)
      })
      .catch((err) => {
        // 웹캠이 설치되어 있지 않거나, 웹캠 권한을 허용하지 않은 경우
        if (!dialogRef.current) {
          dialogRef.current = true
          alertDialog({
            text: '웹캠을 설치하시거나 권한을 허용해 주세요.',
            icon: 'error',
            callback: () => {
              setGuideOpen(true)
            },
          })
        }
      })

    const ctx = canvas?.getContext('2d')
    video?.addEventListener('play', function () {
      videoInterval = setInterval(() => {
        ctx?.drawImage(
          video,
          0,
          0,
          canvas?.width ?? width,
          canvas?.height ?? height,
        )
      }, 0)
    })

    return () => {
      // 마운트 해제시 interval 이벤트 핸들러 제거
      clearInterval(videoInterval)
      clearInterval(monitorInterval)
    }
  }, [videoRef, canvasRef, monitor, width, height, setGuideOpen, alertDialog])

  return (
    <>
      <Wrapper width={width} height={height}>
        <video
          ref={videoRef}
          width={width}
          height={height}
          autoPlay // 직접 정의해서 버튼 클릭 시 작동하도록 가능
          style={{ display: 'none' }}
        ></video>
        <canvas
          className="video"
          ref={canvasRef}
          width={width}
          height={height}
        ></canvas>
        <canvas
          className="layer"
          ref={layerRef}
          width={width}
          height={height}
        ></canvas>
      </Wrapper>
      <LayerPopup isOpen={guideOpen} width={550} onClose={onPopupClose}>
        <h1>카메라 권한 설정 유도 내용</h1>
      </LayerPopup>
    </>
  )
}

export default React.memo(DetectBox)
