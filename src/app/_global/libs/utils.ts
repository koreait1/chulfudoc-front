'use server'

import { cookies } from 'next/headers'
import { headers } from 'next/headers'

/**
 * token 쿠키값 조회
 *
 */
export async function getToken() {
  const cookie = await cookies()

  return cookie.get('token')?.value
}

export async function getUserHash() {
  const cookie = await cookies()

  return cookie.get('User-Hash')?.value
}

// RequestInit은 브라우저의 fetch 함수에서 사용하는 옵션 객체 타입
export async function fetchSSR(url, options: RequestInit = {}) {
  const token = await getToken()
  if (token) {
    options.headers = options.headers ?? {}
    options.headers['Authorization'] = `Bearer ${token}`
  }

  const userHash = await getUserHash()
  if (userHash) {
    options.headers = options.headers ?? {}
    options.headers['User-Hash'] = userHash
  }

  return fetch(`${process.env.API_URL}${url}`, options)
}
