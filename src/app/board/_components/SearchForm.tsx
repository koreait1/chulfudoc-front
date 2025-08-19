import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'

const StyledForm = styled.form`
  .message {
    margin-bottom: 10px;
  }

  .btn {
    margin-right: 15px;
  }
`

const SearchForm = ({ errors, action, pending, form, onChange }) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="redirectUrl" value={form?.redirectUrl ?? ''} />
      <Input
        type="text"
        name="userId"
        placeholder="아이디를 입력하세요."
        value={form.userId}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.userId}</MessageBox>

      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={form.password}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.password}</MessageBox>

      <SubmitButton type="submit" disabled={pending}>
        로그인
      </SubmitButton>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(SearchForm)
