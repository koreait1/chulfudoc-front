'use client'
import Image from 'next/image'
import forbiddenimage from '@/app/_global/assets/images/forbiddenimage.png'
import ErrorImageWrapper from './ErrorImageWrapper'


export default function ForbiddenImage() {
  return (
    <ErrorImageWrapper>
      <Image
        src={forbiddenimage}
        alt="Forbidden"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </ErrorImageWrapper>
  )
}
