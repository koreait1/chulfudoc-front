'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './_global/components/Buttons'
import { AlertTriangle } from 'lucide-react'
import { MdRefresh, MdHome } from 'react-icons/md'
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
  svg {
    margin-right: 1px;
    position: relative;
    top: 0.5px;
  }
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
        <Button
          onClick={() => window.location.reload()}
          color="#22c55e"
          fontSize="medium"
          width={160}
          height={50}
          borderradius="12px"
          fontcolor="white"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MdRefresh size={25} />
          <span style={{ marginLeft: '8px' }}>다시 시도하기</span>
        </Button>

        <Button
          onClick={() => (window.location.href = '/')}
          color="#3b82f6"
          fontSize="medium"
          width={160}
          height={50}
          borderradius="12px"
          fontcolor="white"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MdHome size={25} />
          <span style={{ marginLeft: '8px' }}>메인 이동하기</span>
        </Button>
      </ActionWrapper>
    </Wrapper>
  )
}
