'use client'

import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import MessageBox from '@/app/_global/components/MessageBox'
import AuthNumButton from '@/app/_global/components/AuthNumButton'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'

const StyledForm = styled.form``

type Props = {
  errors: Record<string, any>
  form: { userId: string; email: string }
  pending: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCallback: (payload: any) => void
  setPending: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FindPwForm({
  errors,
  form,
  pending,
  onChange,
  onCallback,
  setPending,
}: Props) {
  const dataQS = new URLSearchParams({
    userId: form.userId ?? '',
    email: form.email ?? '',
  }).toString()

  return (
    <StyledForm autoComplete="off">
      <Input
        name="userId"
        placeholder="아이디를 입력하세요"
        autoComplete="username"
        value={form.userId}
        onChange={onChange}
        disabled={pending}
      />
      <MessageBox color="danger">{errors?.userId}</MessageBox>

      <Input
        type="email"
        name="email"
        placeholder="이메일을 입력하세요"
        autoComplete="email"
        value={form.email}
        onChange={onChange}
        disabled={pending}
      />
      <MessageBox color="danger">{errors?.email}</MessageBox>

      <AuthNumButton
        data={dataQS}
        apiUrl={ApiUrl.PWRESET}
        callback={onCallback}
        width={'180px'}
        onRequestStart={() => setPending(true)}
      >
        임시 비밀번호 보내기
      </AuthNumButton>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}
