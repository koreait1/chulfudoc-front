'use client'

import { ImSpinner4 } from 'react-icons/im'
import styled, { keyframes } from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled(ImSpinner4)`
  animation: ${spin} 1s linear infinite;
  color: #ffd166;
  margin-top: 20px;
`

const LoadingText = styled.h1`
  color: white;
  font-size: 2rem;
`

interface LoadingProps {
  text?: string
  size?: number
  width?: string
  height?: string
}

export default function Loading({
  text = '로딩중',
  size = 80,
  width = '100%',
  height = '100%',
}: LoadingProps) {
  return (
    <Overlay style={{ width, height }}>
      <LoadingText>{text}</LoadingText>
      <Spinner size={size} />
    </Overlay>
  )
}
