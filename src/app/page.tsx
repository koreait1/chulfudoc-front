'use client'
import useFetch from './_global/hooks/useFetch'
import DetectContainer from './detect/_containers/DetectContainer'
export default function MainPage() {
  const data = useFetch('http://localhost:4000/api/v1/member')
  console.log(data)
  return (<>
    <DetectContainer />
  </>)
}