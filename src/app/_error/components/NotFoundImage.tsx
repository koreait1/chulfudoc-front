'use client'
import Image from 'next/image'
import notfoundimage from '@/app/_global/assets/images/notfoundimage.png'
import ErrorImageWrapper from './ErrorImageWrapper'

export default function NotFoundImage() {
  return (
    <ErrorImageWrapper>
      <Image
        src={notfoundimage}
        alt="Not Found"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </ErrorImageWrapper>
  )
}
