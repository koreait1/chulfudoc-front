'use server'

import { cookies } from 'next/headers'

/**
 * token 쿠키값 조회
 *
 */
export async function getToken() {
  const cookie = await cookies()

  return cookie.get('token')?.value
}


export function fetchSSR(url, options: RequestInit = {}) {
  return fetch(`${process.env.API_URL}${url}`, options)
}