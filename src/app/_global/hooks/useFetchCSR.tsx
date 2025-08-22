'use client'
import { useEffect, useState } from 'react'
import { getToken, getUserHash } from '../libs/utils'

export default function useFetchCSR() {
  const [token, setToken] = useState<string | undefined>()
  const [hash, setHash] = useState<string | number | undefined>()

  useEffect(() => {
    ;(async () => {
      setToken(await getToken())
      setHash(await getUserHash())
    })()
  }, [])

  return (url: string, options: RequestInit) => {
    if (token) {
      options.headers = options.headers ?? {}
      options.headers['Authorization'] = `Bearer ${token}`
    }

    if (hash) {
      options.headers = options.headers ?? {}
      options.headers['User-Hash'] = hash
    }

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options)
  }

}

