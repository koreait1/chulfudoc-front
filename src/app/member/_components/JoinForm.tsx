import React, { useState } from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/Forms'
import { Button, SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import FileUpload from '@/app/_global/components/FileUpload'
import FileImages from '@/app/_global/components/FileImages'
import FileItems from '@/app/_global/components/FileItems'
import AuthNumButton from '@/app/_global/components/AuthNumButton'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'

const StyledForm = styled.form``
const sendCode = ApiUrl.SENDCODE
const checkCode:ApiUrl = ApiUrl.CHECKCODE

const JoinForm = ({
  errors,
  action,
  pending,
  onChange,
  onToggle,
  form,
  fileUploadCallback,
  fileDeleteCallback,
}) => {
  const [emailDisabled, setEmailDisabled] = useState(false)

  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="gid" value={form.gid} />
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
        disabled={emailDisabled}         
      />
      <MessageBox color="danger">{errors?.email}</MessageBox>
      <AuthNumButton data={form.email} apiUrl={sendCode} callback={(res) => console.log("이메일 전송 성공 여부 : ", res.emailSuccess)}>인증번호 발송</AuthNumButton>

      <Input 
        type='text'
        name='authNum'
        placeholder='인증 번호를 입력하세요'
        value={form.authNum}
        onChange={onChange}
      />
      <AuthNumButton data={Number(form.authNum)} apiUrl={checkCode} callback={(res) => res.emailSuccess ? setEmailDisabled(true) : console.log('인증 실패')}>인증하기</AuthNumButton>

      <h3>프로필 이미지</h3>

      <FileImages items={form.profileImage} callback={fileDeleteCallback} />
      <FileItems items={form.profileImage} />
      <FileUpload
        gid={form.gid}
        imageOnly={true}
        single={true}
        callback={fileUploadCallback}
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
