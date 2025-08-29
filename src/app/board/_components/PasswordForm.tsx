'use client'
import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'

const StyledForm = styled.form``

const PasswordForm = ({ mode, seq }) => {
  return (
    <StyledForm autoComplete="off">
      <h1>비회원 비밀번호 확인</h1>
      <input type="hidden" name="mode" defaultValue={mode} />
      <input type="hidden" name="seq" defaultValue={seq} />
      <Input type="password" name="password" placeholder="비밀번호" />
      <button type="submit">확인</button>
    </StyledForm>
  )
}

export default React.memo(PasswordForm)
