import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import AuthNumButton from '@/app/_global/components/AuthNumButton'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'

const StyledForm = styled.form``

const FindPwForm = ({ errors, action, pending, form, onChange }) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <Input
        type="text"
        name="userId"
        placeholder="아이디를 입력하세요"
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

      <AuthNumButton data={'userId='+ form.userId + "&email=" + form.email} apiUrl={ApiUrl.PWRESET}>
        임시 비밀번호 보내기
      </AuthNumButton>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(FindPwForm)
