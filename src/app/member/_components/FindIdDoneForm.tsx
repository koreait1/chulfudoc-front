'use client'

import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import MessageBox from '@/app/_global/components/MessageBox'

const StyledForm = styled.form``

type Props = {
  errors: Record<string, any>
  form: { userId: string }
  pending: boolean
  onCallback: () => void
  onSecondary?: () => void
  setPending: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FindIdDoneForm({
  errors,
  form,
  pending,
  onCallback,
  onSecondary,
  setPending,
}: Props) {
  return (
    <StyledForm autoComplete="off">
      <Input
        name="userId"
        value={form.userId}
        readOnly
        disabled={pending}
      />
      <MessageBox color="danger">{errors?.userId}</MessageBox>

      <div>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setPending(true)
            onCallback()
            setPending(false)
          }}
        >
          로그인
        </button>{' '}
        {onSecondary && (
          <button type="button" disabled={pending} onClick={onSecondary}>
            비밀번호 찾기
          </button>
        )}
      </div>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}
