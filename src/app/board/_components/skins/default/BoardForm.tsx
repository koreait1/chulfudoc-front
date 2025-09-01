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
    display: grid;
    grid-template-columns: 140px 1fr;
    align-items: center;
    border-bottom: 1px solid #f2eecb;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  dl:first-of-type {
    border-top: 2px solid #ffd93d;
  }

  dt {
    padding: 12px 16px;
    background: #fffdf2;
    border-right: 1px solid #f2eecb;
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
  }

  dd {
    padding: 12px;
    background: #ffffff;
    color: #212529;
  }

  dd input[type='text'],
  dd input[type='password'],
  dd textarea,
  dd select {
    border: 1px solid #e9e5c9 !important;
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 0.95rem;
    width: 100%;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  dd input[type='text']:focus,
  dd input[type='password']:focus,
  dd textarea:focus,
  dd select:focus {
    border-color: #ffd93d !important;
    box-shadow: 0 0 0 2px rgba(255, 217, 61, 0.25);
    outline: none;
  }

  .notice-toggle,
  dd > span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid #e9e5c9;
    border-radius: 6px;
    background: #fff;
    font-size: 0.9rem;
    color: #333;
    cursor: pointer;
    transition: background 0.15s ease, transform 0.05s ease;
  }

  .notice-toggle:hover,
  dd > span:hover {
    background: #fffbea;
  }

  button[type='submit'] {
    margin-top: 20px;
    background: #ffd93d !important;
    border: 1px solid #ffd93d !important;
    border-radius: 8px !important;
    font-weight: 600;
    padding: 10px 20px;
    transition: filter 0.15s ease;
  }

  button[type='submit']:hover {
    filter: brightness(1.05);
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
