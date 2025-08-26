'use client'

import React from 'react'
import styled from 'styled-components'
import { SubmitButton } from '@/app/_global/components/Buttons'
import { Input } from '@/app/_global/components/Forms'
import MessageBox from '@/app/_global/components/MessageBox'
import FileUpload from '@/app/_global/components/FileUpload'
import FileImages from '@/app/_global/components/FileImages'

const StyledForm = styled.form``

const ProfileForm = ({
  form,
  errors,
  action,
  pending,
  onChange,
  fileUploadCallback,
  fileDeleteCallback,
}) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <dl>
        <dt>아이디</dt>
        <dd>{form.userId}</dd>
      </dl>
      <dl>
        <dt>회원명</dt>
        <dd>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.name}
          </MessageBox>
        </dd>
      </dl>

      <dl>
        <dt>비밀번호</dt>
        <dd>
          <Input
            type="password"
            name="password"
            value={form.password ?? ''}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.password}
          </MessageBox>
        </dd>
      </dl>
      <dl>
        <dt>비밀번호 확인</dt>
        <dd>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword ?? ''}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.confirmPassword}
          </MessageBox>
        </dd>
      </dl>

      <dl>
        <dt>휴대전화번호</dt>
        <dd>
          <Input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.mobile}
          </MessageBox>
        </dd>
      </dl>
      
      <dl>
        <dt>프로필 이미지</dt>
        <dd>
          <FileImages
            items={form.profileImage}
            width={200}
            height={200}
            viewOrgImage={true}
            callback={fileDeleteCallback}
          />
          <FileUpload
            gid={form.gid}
            single={true}
            imageOnly={true}
            callback={fileUploadCallback}
          />
        </dd>
      </dl>
      <SubmitButton type="submit" width={350} disabled={pending}>
        수정하기
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(ProfileForm)
