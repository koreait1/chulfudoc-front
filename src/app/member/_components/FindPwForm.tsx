'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'

type Props = {
  errors: any
  action: (formData: FormData) => void
}

function SubmitArea() {
  const { pending } = useFormStatus()
  return (
    <SubmitButton type="submit" disabled={pending}>
      비밀번호 찾기
    </SubmitButton>
  )
}

export default function FindPwForm({ errors, action }: Props) {
  return (
    <form action={action} autoComplete="off">
      <Input name="userId" placeholder="아이디" />
      <MessageBox color="danger">{errors?.userId}</MessageBox>

      <Input name="email" placeholder="이메일" />
      <MessageBox color="danger">{errors?.email}</MessageBox>

      <SubmitArea />
      <MessageBox color="danger">{errors?.global}</MessageBox>
    </form>
  )
}
