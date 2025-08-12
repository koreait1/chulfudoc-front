'use client'
import DetectBox from './detect/_components/DetectBox'
export default function MainPage() {
  const callback = (item) => {
    console.log('item', item)
  }
  return <DetectBox width={500} height={500} callback={callback} />
}