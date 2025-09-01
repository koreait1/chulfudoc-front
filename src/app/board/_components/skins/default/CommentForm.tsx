'use client'
import React from 'react'
import styled from 'styled-components'
import type { CommentType } from '@/app/board/_types/CommentType'
import Loading from '@/app/_global/components/Loading'
import MessageBox from '@/app/_global/components/MessageBox'
import color from '@/app/_global/styles/color'

const { dark, light } = color

const StyledForm = styled.form`
  /* 컨테이너 */
  border: 1px solid #ffe89a;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 10px;
  background: #ffffff;

  .top {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;

    input {
      height: 40px;
      width: 160px;
      padding: 0 12px;
      background: #ffffff;
      border: 1px solid #ffe89a;
      border-radius: 10px;
      outline: none;
      transition: box-shadow 0.15s ease, border-color 0.15s ease;
    }

    input:focus {
      border-color: #ffd93d;
      box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.25);
    }
  }

  .bottom {
    display: flex;
    gap: 6px;
    height: 100px;

    textarea {
      flex: 1;
      resize: none;
      padding: 10px 12px;
      background: #ffffff;
      border: 1px solid #ffe89a;
      border-radius: 10px;
      outline: none;
      transition: box-shadow 0.15s ease, border-color 0.15s ease;
    }

    textarea:focus {
      border-color: #ffd93d;
      box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.25);
    }

    button {
      width: 120px;
      min-width: 120px;
      height: 100%;
      border: 1px solid #ffd93d;
      border-radius: 10px;
      background: #ffd93d;
      color: #000000;
      cursor: pointer;
      font-weight: 600;
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
  }
`

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
          {form?.mode === 'comment_update' ? '수정하기' : '작성하기'}{' '}
          <Loading loading={Boolean(pending)} />
        </button>
      </div>
      <MessageBox color="danger">{errors?.content}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(CommentForm)
