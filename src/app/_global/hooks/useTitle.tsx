'use client'
import { useContext, useEffect } from 'react'
import CommonContext from '../contexts/CommonContext'
export default function useTitle(title: string) {
  const {
    states: { mainTitle },
    actions: { setMainTitle },
  } = useContext(CommonContext)

  useEffect(() => {
    setMainTitle(title)
  }, [title, setMainTitle])

  return [mainTitle, setMainTitle]
}
