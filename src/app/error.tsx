'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './_global/components/Buttons'
import { AlertTriangle } from 'lucide-react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
`

const IconWrapper = styled.div`
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const Message = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
`

const ActionWrapper = styled.div`
  display: flex;
  gap: 1rem;
`

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Wrapper>
      <IconWrapper>
        <AlertTriangle size={48} />
      </IconWrapper>
      <Title>500 Internal Server Error</Title>
      <Message>{error?.message || 'An unknown error has occurred.'}</Message>
      <ActionWrapper>
        <Button type="button" onClick={() => window.location.reload()}>
          다시 시도하기
        </Button>
        <Button type="button" onClick={() => (window.location.href = '/')}>
          메인 이동하기
        </Button>
      </ActionWrapper>
    </Wrapper>
  )
}
