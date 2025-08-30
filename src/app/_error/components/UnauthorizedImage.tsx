'use client'
import Image from 'next/image'
import unauthorizedimage from '@/app/_global/assets/images/unauthorizedimage.png'
import ErrorImageWrapper from './ErrorImageWrapper'

export default function UnauthorizedImage() {
  return (
    <ErrorImageWrapper>
      <Image
        src={unauthorizedimage}
        alt="Unauthorized"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </ErrorImageWrapper>
  )
}