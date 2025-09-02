'use client'

import React from 'react'
import styled from 'styled-components'
import { SubmitButton } from '@/app/_global/components/Buttons'
import { Input } from '@/app/_global/components/Forms'
import MessageBox from '@/app/_global/components/MessageBox'
import FileUpload from '@/app/_global/components/FileUpload'
import FileImages from '@/app/_global/components/FileImages'
import fontSize from '@/app/_global/styles/fontsize'
import color from '@/app/_global/styles/color'
const { big, medium } = fontSize
const { danger, primary } = color

const StyledForm = styled.form`
  width: 100%;
  max-width: 560px;
  padding: 15px 30px 30px;
  border: 1px solid #ccc;
  border-radius: 50px;
  margin: 0 auto 80px;
  .form {
    margin: 0 0 10px;
    > li:nth-child(2n-1) {
      font-size: ${big};
      margin: 10px 0;
    }
    > li:nth-child(2n) {
      p {
        margin: 10px 0 0;
        padding: 10px;
        border: 1px solid #ccc;
        font-size: ${medium};
        border-radius: 10px;
      }
    }
    > li:last-child {
      position: relative;
      height: 230px;
    }
    ul {
      display: inline-block;
      li {
        width: 200px;
      }
      svg {
        position: absolute;
        top: 5px;
        right: 5px;
        color: ${danger};
      }
    }
    ul,
    button {
      width: 200px;
      height: 200px;
      margin: 0;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translate(-50%);
    }
    button {
      border: 1px solid ${primary};
      background: #fff;
      color: #333;
      svg {
        color: #333;
      }
      &:hover {
        background: ${primary};
      }
    }
  }
  button {
    color: #333;
  }
`

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
      <ul className="form">
        <li>아이디</li>
        <li>
          <p>{form.userId}</p>
        </li>
        <li>회원명</li>
        <li>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.name}
          </MessageBox>
        </li>
        <li>비밀번호</li>
        <li>
          <Input
            type="password"
            name="password"
            value={form.password ?? ''}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.password}
          </MessageBox>
        </li>
        <li>비밀번호 확인</li>
        <li>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword ?? ''}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.confirmPassword}
          </MessageBox>
        </li>
        <li>휴대전화번호</li>
        <li>
          <Input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={onChange}
          />
          <MessageBox color="danger">
            {!errors?.done && errors?.mobile}
          </MessageBox>
        </li>
        <li>프로필 이미지</li>
        <li>
          <FileUpload
            gid={form.gid}
            single={true}
            imageOnly={true}
            callback={fileUploadCallback}
          >
            프로필 업로드
          </FileUpload>
          <FileImages
            items={form.profileImage}
            width={200}
            height={200}
            viewOrgImage={true}
            callback={fileDeleteCallback}
          />
        </li>
      </ul>
      <SubmitButton type="submit" wilih={350} disabled={pending}>
        수정하기
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(ProfileForm)
