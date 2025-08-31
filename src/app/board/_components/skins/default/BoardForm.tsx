'use client'
import React from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import type { BoardFormType } from '@/app/board/_types/BoardType'
import MessageBox from '@/app/_global/components/MessageBox'
import { Input, Select, Textarea } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import useUser from '@/app/_global/hooks/useUser'
import Editor from '@/app/_global/components/Editor'
import FileUpload from '@/app/_global/components/FileUpload'
import FileItems from '@/app/_global/components/FileItems'
import Loading from '@/app/_global/components/Loading'

const StyledForm = styled.form`
  dl {
    display: flex;

    &:last-of-type {
      margin-bottom: 30px;
    }

    &:first-of-type {
      dt,
      dd {
        border-top: 1px solid #ffe89a;
      }
    }
  }

  dt,
  dd {
    border-bottom: 1px solid #ffe89a;
  }

  dt {
    width: 120px;
    background: #fff8cc;
    padding: 10px 20px;
    color: #000000;
  }

  dd {
    flex-grow: 1;
    padding: 10px;
    background: #ffffff;
    color: #212529;
  }

  dt,
  dd {
    svg {
      font-size: 2rem;
      vertical-align: middle;
      margin-right: 10px;
      color: #000000;
    }
  }

  .notice-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 38px;
    padding: 0 12px;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #ffe89a;
    color: #212529;
    cursor: pointer;
    user-select: none;
    transition: filter 0.15s ease, transform 0.05s ease, background 0.15s ease;

    &:hover {
      background: #fffcee;
    }
    &:active {
      transform: translateY(1px);
    }
  }

  dd input[type='text'],
  dd input[type='password'],
  dd textarea,
  dd select {
    border-color: #ffe89a !important;
  }
  dd input[type='text']:focus,
  dd input[type='password']:focus,
  dd textarea:focus,
  dd select:focus {
    border-color: #ffd93d !important;
    box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.25) !important;
    outline: none;
  }

  .editor-block,
  .attach-block {
    padding-top: 8px;
    border-top: 1px dashed #ffe89a;
    margin-top: 8px;
  }

  .btn {
    background: #ffd93d !important;
    color: #000000 !important;
    border: 1px solid #ffe89a !important;
    border-radius: 12px !important;
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
`

const BoardForm = ({
  board,
  data,
  action,
  errors,
  pending,
  onChange,
  onToggle,
  editorCallback,
  fileUploadCallback,
  fileDeleteCallback,
}: BoardFormType) => {
  const { isAdmin } = useUser()

  return (
    board && (
      <StyledForm action={action} autoComplete="off">
        <input type="hidden" name="mode" defaultValue={data.mode} />
        <input type="hidden" name="bid" defaultValue={data.bid} />
        <input type="hidden" name="gid" defaultValue={data.gid} />
        <input type="hidden" name="notice" defaultValue={'' + data.notice} />
        {data.mode === 'update' && (
          <>
            <input type="hidden" name="seq" defaultValue={data.seq} />
            <MessageBox color="danger">{errors?.seq}</MessageBox>
          </>
        )}
        <MessageBox color="danger">{errors?.bid}</MessageBox>
        <MessageBox color="danger">{errors?.gid}</MessageBox>
        <MessageBox color="danger">{errors?.global}</MessageBox>

        <dl>
          <dt>작성자</dt>
          <dd>
            <Input
              type="text"
              name="poster"
              value={data.poster}
              onChange={onChange}
            />
            <MessageBox color="danger">{errors?.poster}</MessageBox>
          </dd>
        </dl>
        {isAdmin && (
          <dl>
            <dt>공지글</dt>
            <dd>
              <span onClick={() => onToggle('notice', !data.notice)}>
                {data.notice ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                공지글로 게시하기
              </span>
            </dd>
          </dl>
        )}
        {data.guest && (
          <dl>
            <dt>비밀번호</dt>
            <dd>
              <Input
                type="password"
                name="guestPw"
                value={data.guestPw ?? ''}
                onChange={onChange}
                suppressHydrationWarning={true}
              />
              <MessageBox color="danger">{errors?.guestPw}</MessageBox>
            </dd>
          </dl>
        )}
        {board.categories && board.categories.length > 0 && (
          <dl>
            <dt>분류</dt>
            <dd>
              <Select name="category" value={data.category} onChange={onChange}>
                {board.categories.map((c) => (
                  <option value={c} key={'category-' + c}>
                    {c}
                  </option>
                ))}
              </Select>
            </dd>
          </dl>
        )}
        <dl>
          <dt>글제목</dt>
          <dd>
            <Input
              type="text"
              name="subject"
              value={data.subject}
              onChange={onChange}
            />
            <MessageBox color="danger">{errors?.subject}</MessageBox>
          </dd>
        </dl>
        <dl>
          <dt>글내용</dt>
          <dd>
            {board.editor ? (
              <>
                <input
                  type="hidden"
                  name="content"
                  defaultValue={data.content}
                />
                <Editor
                  data={data.content}
                  height={350}
                  callback={editorCallback}
                  onChange={onChange}
                />
                {board.imageUpload && (
                  <>
                    <FileUpload
                      gid={data.gid}
                      location="editor"
                      imageOnly={true}
                      callback={fileUploadCallback}
                    />
                    <FileItems
                      items={data.editorImages}
                      callback={fileDeleteCallback}
                    />
                  </>
                )}
              </>
            ) : (
              <Textarea
                name="content"
                value={data.content}
                onChange={onChange}
              />
            )}
            <MessageBox color="danger">{errors?.content}</MessageBox>
          </dd>
        </dl>
        {board.attachFile && (
          <dl>
            <dt>파일첨부</dt>
            <dd>
              <FileUpload
                gid={data.gid}
                location="attach"
                callback={fileUploadCallback}
              />
              <FileItems
                items={data.attachFiles}
                callback={fileDeleteCallback}
              />
            </dd>
          </dl>
        )}
        <SubmitButton type="submit" width={280} disabled={pending}>
          {data.mode === 'update' ? '수정하기' : '작성하기'}
          <Loading loading={pending} />
        </SubmitButton>
      </StyledForm>
    )
  )
}

export default React.memo(BoardForm)
