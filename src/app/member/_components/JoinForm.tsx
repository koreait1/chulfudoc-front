import React from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'

const StyledForm = styled.form``

const JoinForm = ({ errors, action, pending, onChange, onToggle, form }) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="termsAgree" value={form.termsAgree} />
      <Input
        type="text"
        name="email"
        placeholder="이메일을 입력하세요"
        value={form.email}
        onChange={onChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요."
        value={form.password}
        onChange={onChange}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 확인하세요."
        value={form.confirmPassword}
        onChange={onChange}
      />
      <Input
        type="text"
        name="name"
        placeholder="회원이름을 입력하세요."
        value={form.name}
        onChange={onChange}
      />
      <Input
        type="text"
        name="mobile"
        placeholder="휴대전화번호를 입력하세요."
        value={form.mobile}
        onChange={onChange}
      />

      <h3>약관동의</h3>
      <div className="terms-agree" onClick={onToggle}>
        {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 회원가입
        약관에 동의합니다.
      </div>
      <div>약관 동의 작성...</div>
      <SubmitButton type="submit" disabled={pending}>
        가입하기
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(JoinForm)
