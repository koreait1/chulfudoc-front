import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'

const StyledForm = styled.form``

const FindPwForm = ({errors, action, pending, form, onChange}) => {
  return(
    <StyledForm action={action}  autoComplete="off">
      <Input 
        type='text' 
        name='userId'
        placeholder='아이디를 입력하세요' 
        value={form.userId}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.userId}</MessageBox>

      <Input
        type="email"
        name="email"
        placeholder="이메일을 입력하세요."
        value={form.email}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.email}</MessageBox>
      
      <SubmitButton type="submit" disabled={pending}>
        로그인
      </SubmitButton>
      
      <MessageBox color="danger">{errors?.global}</MessageBox> 
    </StyledForm>
  )
}

export default React.memo(FindPwForm)