import React from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/Forms'
import { Button, SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import useFetch from '@/app/_global/hooks/useFetch'

const StyledForm = styled.form`

`

const JoinForm = ({ errors, action, pending, onChange, onToggle, form }) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="termsAgree" value={form.termsAgree} />
      <Input
        type="text"
        name="userId"
        placeholder="아이디를 입력하세요"
        value={form.userId}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.userId}</MessageBox>

      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        value={form.password}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.password}</MessageBox>

      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 확인하세요"
        value={form.confirmPassword}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.confirmPassword}</MessageBox>

      <Input
        type="text"
        name="name"
        placeholder="회원이름을 입력하세요"
        value={form.name}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.name}</MessageBox>

      <Input
        type="text"
        name="mobile"
        placeholder="휴대전화번호를 입력하세요"
        value={form.mobile}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.mobile}</MessageBox>


      <Input
        type="text"
        name="email"
        placeholder="이메일을 입력하세요"
        value={form.email}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.email}</MessageBox>
      <Button type='button' disabled={pending} onClick={() => fetch("/email/verify")}>인증번호 전송</Button>

      <Input 
        type='text'
        name='auth_num'
        placeholder='인증 번호를 입력하세요'
        value={form.authNum}
        onChange={onChange}
      />

      <h3>약관동의</h3>
      <div>약관 동의 작성...</div>
      <div className="terms-agree" onClick={onToggle}>
        {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 회원가입
        약관에 동의합니다.
      </div>
      <MessageBox color="danger">{errors?.termsAgree}</MessageBox>

      <SubmitButton type="submit" disabled={pending}>
        가입하기
      </SubmitButton>
      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(JoinForm)
