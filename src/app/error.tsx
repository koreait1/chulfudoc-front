'use client'
import { useEffect } from 'react'
import { Button } from './_global/components/Buttons'
export default function Error({ error, reset }) {
  useEffect(() => {
    // 에러 객체에 대한 로깅
    console.error(error)
  }, [error])

  return (
    <>
      <h2>{error.message}</h2>
      <Button type="button" onClick={() => reset()}>
        다시 로딩
      </Button>
    </>
  )
}