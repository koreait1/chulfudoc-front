// src/app/member/_components/FindIdForm.tsx
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
  form: { name: string; email: string }
  pending: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCallback: (payload: any) => void
  setPending: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FindIdForm({
  errors,
  form,
  pending,
  onChange,
  onCallback,
  setPending,
}: Props) {
  const dataQS = new URLSearchParams({
    name: form.name ?? '',
    email: form.email ?? '',
  }).toString()

  return (
    <StyledForm autoComplete="off">
      <Input
        name="name"
        placeholder="이름을 입력하세요"
        autoComplete="name"
        value={form.name}
        onChange={onChange}
        disabled={pending}
      />
      <MessageBox color="danger">{errors?.name}</MessageBox>

      <Input
        type="email"
        name="email"
        placeholder="회원가입 시 사용한 이메일을 입력하세요"
        autoComplete="email"
        value={form.email}
        onChange={onChange}
        disabled={pending}
      />
      <MessageBox color="danger">{errors?.email}</MessageBox>

      <AuthNumButton
        data={dataQS}
        apiUrl={ApiUrl.FINDUSERID}
        callback={onCallback}
        onRequestStart={() => setPending(true)}
      >
        아이디 찾기
      </AuthNumButton>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}
