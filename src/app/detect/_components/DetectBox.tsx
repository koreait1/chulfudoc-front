'use client'

import { Buffer } from 'buffer'
import React, { useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { processDetect } from '../_services/actions'

const DetectBox = () => {
  /* dom 객체를 직접적으로 수정하기 위해 */
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    navigator.mediaDevices
      .getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      })
      .then((stream) => {
        if (video) video.srcObject = stream
      })
      .catch((err) => console.error(err))

    const ctx = canvas?.getContext('2d')
    video?.addEventListener('play', function () {
      setInterval(function () {
        ctx?.drawImage(video, 0, 0, canvas?.width ?? 640, canvas?.height ?? 480)
      }, 0)
    })
  }, [videoRef, canvasRef])

  const onClick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      blob?.arrayBuffer()
      .then(data => {
        processDetect(Buffer.from(data))
        .then(items => console.log(items))
      });
    });

  }, [canvasRef])

  return (
    <>
      <video
        ref={videoRef}
        width={640}
        height={480}
        autoPlay
        style={{ display: 'none' }}
      ></video>
      <canvas ref={canvasRef} width={640} height={480}></canvas>
      <button type="button" onClick={onClick}>감지하기</button>
    </>
  )
}

export default React.memo(DetectBox)
