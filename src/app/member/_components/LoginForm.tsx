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
    margin-top: 15px;
  }

  .accountFindBtn{
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
  }

  .accountLink{
    font-size: 14px;
    color: #000;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .loginbtn{
    margin-bottom: 10px;
  }
`

const LoginForm = ({ errors, action, pending, form, onChange }) => {
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

      {/* 아이디 비밀번호 찾기 페이지 경로 집어 넣을 것 */}
      <div className='accountFindBtn'>
        <a href='/member/join' className='accountLink'>회원 가입</a>
        <a href='/member/findid' className='accountLink'>아이디 찾기</a>
        <a href='/member/findpw' className='accountLink'>비밀번호 찾기</a>
      </div>

      <div className="loginbtn">
        <SubmitButton type="submit" disabled={pending} >
          로그인
        </SubmitButton>
      </div>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(LoginForm)
