'use client'
import useFetch from './_global/hooks/useFetch'
export default function MainPage() {
  const data = useFetch('http://localhost:4000/api/v1/member')
  console.log(data)
  return <></>
}