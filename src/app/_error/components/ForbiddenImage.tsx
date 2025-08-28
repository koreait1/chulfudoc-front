'use client'
import Image from 'next/image'
import notfoundimage from '@/app/_global/assets/images/notfoundimage.png'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: 100vh; /* 화면 높이 꽉 채움 */
  position: relative; /* Image fill 모드에 필요 */
  overflow: hidden;
`

export default function ForbiddenImage() {
  return (
    <Wrapper>
      <Image
        src={notfoundimage}
        alt="Forbidden"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />
    </Wrapper>
  )
}
