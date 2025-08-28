'use client'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  startSignal?:  boolean
  duration?: number
  onExpire?: () => void 
}

export default function AuthCount({ startSignal = false, duration = 180, onExpire }: Props) {
  const [count, setCount] = useState(duration)
  const [sending, setSending] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (startSignal == false) return
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setCount(duration)
    setSending(true)
  }, [startSignal, duration])

  //타이머 형식 -> 분:초
  const formatTime = (sec: number) => {
    const min = String(Math.floor(sec / 60)).padStart(2, '0')
    const s = String(sec % 60).padStart(2, '0')
    return `${min}:${s}`
  }

  //1초마다 count 감소
  useEffect(() => {
    //오류 나면 보내지 않음
    if (!sending) return

    timerRef.current = window.setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          //0이 되면 멈춤
          if (timerRef.current !== null) {
            // null이 아닐 때만 정리
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          setSending(false)
          onExpire?.()  
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [sending, onExpire, startSignal])

  return (
    <>
      <span className="sendCount">{sending ? formatTime(count) : ''}</span>
    </>
  )
}
