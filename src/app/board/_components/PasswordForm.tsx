'use client'
import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import MessageBox from '@/app/_global/components/MessageBox'
import Loading from '@/app/_global/components/Loading'

const StyledForm = styled.form`
  max-width: 460px;
  margin: 24px auto;
  padding: 22px 20px;
  border: 1px solid #ffe89a;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);

  h1 {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0 0 14px;
    color: #000000;
    padding-bottom: 10px;
    border-bottom: 2px solid #ffd93d;
  }

  .field {
    margin: 10px 0 2px;
  }

  input[type='password'] {
    height: 44px;
    border: 1px solid #ffe89a !important;
    border-radius: 10px;
    background: #ffffff;
    padding: 0 12px;
    outline: none;
    transition: box-shadow 0.15s ease, border-color 0.15s ease;
  }
  input[type='password']:focus {
    border-color: #ffd93d !important;
    box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.25);
  }

  .error {
    margin: 6px 0 10px;
  }

  button[type='submit'] {
    width: 100%;
    height: 44px;
    margin-top: 8px;
    border: 1px solid #ffd93d;
    border-radius: 10px;
    background: #ffd93d;
    color: #000000;
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.15s ease, transform 0.05s ease;

    &:hover {
      filter: brightness(1.02);
    }
    &:active {
      transform: translateY(1px);
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .helper {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #6c757d;
    text-align: center;
  }
`

const PasswordForm = ({
  mode,
  seq,
  errors,
  action,
  pending,
  password,
  onChange,
}) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <h1>비회원 비밀번호 확인</h1>
      <input type="hidden" name="mode" defaultValue={mode} />
      <input type="hidden" name="seq" defaultValue={seq} />
      <MessageBox color="danger">{errors?.mode}</MessageBox>
      <MessageBox color="danger">{errors?.seq}</MessageBox>
      <MessageBox color="danger">{errors?.global}</MessageBox>

      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
      />
      <MessageBox color="danger">{errors?.password}</MessageBox>

      <button type="submit" disabled={pending}>
        확인
        <Loading loading={pending} />
      </button>
    </StyledForm>
  )
}

export default React.memo(PasswordForm)
