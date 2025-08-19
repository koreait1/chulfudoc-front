'use client'
import useSWR from 'swr'
import useUser from './useUser'
import { useCookies } from 'react-cookie'

type FetchOptionType = RequestInit

const fetcher = (url: string, options: FetchOptionType) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options).then((res) =>
    res.json(),
  )

export default function useFetch(url) {
  const { token } = useUser()
  const [cookies] = useCookies(['User-Hash'])
  // token이 있다면 로그인한 회원 기반의 요청을 해야 하므로
  // 요청 헤더 Authorization: Bearer 토큰
  const options = {
    method: 'GET',
    headers: {},
  }
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  if (cookies['User-Hash']) {
    options.headers['User-Hash'] = cookies['User-Hash']
  }

  return useSWR(url, (url) => fetcher(url, options))
}