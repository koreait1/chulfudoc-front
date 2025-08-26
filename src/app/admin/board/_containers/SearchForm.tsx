import React, { useState } from 'react'
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
  const [skey, setSkey] = useState()
  onChange = (e) => {
    setSkey(e.target.value)
  }
  console.log(skey)
  return (
    <StyledForm action={action} autoComplete="off">
      <select name="sopt">
        {/* sopt - ALL : 통합검색 (SUBJECT + CONTENT + NAME)
         * SUBJECT : 게시글 제목
         * CONTENT : 게시글 내용
         * SUBJECT_CONTENT : 게시글 제목 + 내용
         * NAME : 작성자명(poster) + 회원명(name) + 이메일(email) */}
        <option value={'ALL'}></option>
        <option value={'SUBJECT' + 'CONTENT' + 'NAME'}></option>
        <option value={'SUBJECT'}></option>
        <option value={'CONTENT'}></option>
        <option value={'SUBJECT_CONTENT'}></option>
        <option value={'NAME'}></option>
      </select>
      <Input
        type="text"
        name="skey"
        placeholder="검색어를 입력해주세요"
        value={skey}
        onChange={onChange}
      />
      <SubmitButton type="submit" disabled={pending}>
        검색
      </SubmitButton>
      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(SearchForm)
