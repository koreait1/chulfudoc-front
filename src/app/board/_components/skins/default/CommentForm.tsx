'use client'
import React from 'react'
import styled from 'styled-components'
import type { CommentType } from '@/app/board/_types/CommentType'
import Loading from '@/app/_global/components/Loading'
import MessageBox from '@/app/_global/components/MessageBox'
import color from '@/app/_global/styles/color'
import fontsize from '@/app/_global/styles/fontsize'
const StyledForm = styled.form``

const CommentForm = ({
  form,
  onChange,
  action,
  errors,
  pending,
}: CommentType) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="guest" defaultValue={'' + form?.guest} />
      <input
        type="hidden"
        name="mode"
        defaultValue={form?.mode ?? 'comment_write'}
      />
      {form?.mode === 'comment_update' && (
        <input type="hidden" name="seq" defaultValue={form?.seq} />
      )}
      <input
        type="hidden"
        name="boardDataSeq"
        defaultValue={form?.boardDataSeq ?? ''}
      />
      <MessageBox color="danger">{errors?.mode}</MessageBox>
      <MessageBox color="danger">{errors?.seq}</MessageBox>
      <MessageBox color="danger">{errors?.boardDataSeq}</MessageBox>
      <MessageBox color="danger">{errors?.global}</MessageBox>

      <div className="top">
        <input
          type="text"
          name="commenter"
          placeholder="작성자"
          value={form?.commenter ?? ''}
          onChange={onChange}
        />
        <MessageBox color="danger">{errors?.commenter}</MessageBox>

        {form?.guest && (
          <>
            <input
              type="password"
              name="guestPw"
              value={form?.guestPw ?? ''}
              onChange={onChange}
              placeholder="비밀번호"
            />
            <MessageBox color="danger">{errors?.guestPw}</MessageBox>
          </>
        )}
      </div>
      <div className="bottom">
        <textarea
          name="content"
          value={form?.content ?? ''}
          onChange={onChange}
          placeholder="댓글을 입력하세요."
        />
        <button type="submit" disabled={pending}>
          작성하기 <Loading loading={Boolean(pending)} />
        </button>
      </div>
      <MessageBox color="danger">{errors?.content}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(CommentForm)
