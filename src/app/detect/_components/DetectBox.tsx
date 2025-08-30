'use client'
import React, { useRef, useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import LayerPopup from '@/app/_global/components/LayerPopup'
import ableimage from '@/app/_global/assets/images/ableimage.png'
import disableimage from '@/app/_global/assets/images/disableimage.png'
import tune from '@/app/_global/assets/images/tune.png'

type WrapperType = {
  children: React.ReactNode
  width?: number
  height?: number
}

const Wrapper = styled.div<WrapperType>`
  position: relative;
  width: ${({ width }) => width ?? 640}px;
  height: ${({ height }) => height ?? 480}px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  border: 7px solid #fff;

  video {
    display: none; /* 실제 웹캠 비디오는 숨김 */
  }

  canvas.video {
    width: 100%;
    height: 100%;
    display: block;
  }

  canvas.layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

const PermitWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background: #fff;
  border-radius: 12px;
  text-align: center;

  h1 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 16px;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 12px;
    line-height: 1.5;

    span {
      font-weight: 600;
      color: #4caf50;
    }
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
      .catch(() => {
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
        <PermitWrapper>
          <h1>웹캠 사용 허가가 필요해요!</h1>
          <p>실시간 모니터링을 위해 카메라 접근 권한을 허용해주세요. 😊</p>
          <p>허용하지 않으면 쓰러짐 감지 기능을 사용할 수 없어요.</p>
          <p>
            브라우저 상단 주소창 옆{" "}
            <img
              src={tune.src}
              alt="튠 아이콘"
              style={{ width: 24, height: 24, verticalAlign: "middle", marginRight: 4 }}
            />
            아이콘을 클릭하고<br /> 카메라 권한을 <span>허용</span>으로 바꿔주세요.
          </p>
    {/* 이미지 2개를 가로로 배치 */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        marginTop: "24px",
        width: "100%",
      }}
    >
      {/* 비허용 상태 */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src={disableimage.src}
          alt="비허용 상태"
          style={{
            width: "100%",
            maxWidth: "240px",
            borderRadius: "12px",
            border: "2px solid #f44336",
          }}
        />
        <p style={{ marginTop: "8px", color: "#f44336", fontWeight: 600 }}>
          비허용 상태
        </p>
        </div>

          {/* 허용 상태 */}
          <div style={{ flex: 1, textAlign: "center" }}>
            <img
              src={ableimage.src}
              alt="허용 상태"
              style={{
                width: "100%",
                maxWidth: "240px",
                borderRadius: "12px",
                border: "2px solid #4caf50",
              }}
            />
            <p style={{ marginTop: "8px", color: "#4caf50", fontWeight: 600 }}>
              허용 상태
            </p>
          </div>
        </div>
        </PermitWrapper>
      </LayerPopup>
    </>
  )
}

export default React.memo(DetectBox)
