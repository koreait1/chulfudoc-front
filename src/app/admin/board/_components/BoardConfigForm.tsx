import React from 'react'
import styled from 'styled-components'
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md'
import MessageBox from '@/app/_global/components/MessageBox'
import { Input, Textarea, TableCols } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'

const StyledForm = styled.form`
  margin-top: 6px;

  ${TableCols} {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #ffffff;
    border-top: 2px solid #ffe89a;
    border-bottom: 1px solid #ffe89a;
    margin-bottom: 16px;
    border-radius: 10px;
    overflow: hidden;
  }

  ${TableCols} thead th {
    background: #fff8cc;
  }

  ${TableCols} th,
  ${TableCols} td {
    border-bottom: 1px solid #fff3b8;
    padding: 12px 14px;
    vertical-align: middle;
  }

  ${TableCols} tr:last-of-type th,
  ${TableCols} tr:last-of-type td {
    border-bottom: none;
  }

  ${TableCols} th {
    background: #fffdf2;
    border-right: 1px solid #ffe89a;
    color: #222222;
    font-weight: 700;
    white-space: nowrap;
  }

  ${TableCols} td {
    background: #ffffff;
    color: #212529;
  }

  h2 {
    margin: 18px 0 10px;
    font-size: 1.05rem;
    font-weight: 800;
    color: #111111;
    padding-left: 10px;
    position: relative;
  }
  h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 4px;
    height: 60%;
    transform: translateY(-50%);
    background: #ffd93d;
    border-radius: 4px;
  }

  input[type='text'],
  input[type='number'],
  textarea {
    width: 100%;
    height: 38px;
    border: 1px solid #e9e5c9;
    background: #ffffff;
    color: #222222;
    border-radius: 8px;
    padding: 0 10px;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  textarea {
    min-height: 120px;
    padding: 10px;
    line-height: 1.5;
    resize: vertical;
  }
  input[type='number'] {
    max-width: 160px;
  }

  input:focus,
  textarea:focus {
    border-color: #ffd93d;
    box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.25);
  }

  .radio {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid #e9e5c9;
    color: #333333;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease, transform 0.05s ease,
      border-color 0.15s ease;
  }
  .radio:hover {
    background: #fffbea;
    border-color: #ffe89a;
  }
  .radio + .radio {
    margin-left: 8px;
  }
  .radio svg {
    font-size: 1.1rem;
    vertical-align: middle;
    color: #111111;
  }

  button[type='submit'] {
    height: 40px;
    padding: 0 18px;
    border-radius: 10px;
    background: #ffd93d;
    border: 1px solid #ffd93d;
    color: #000000;
    font-weight: 700;
    transition: filter 0.15s ease, transform 0.05s ease;
  }
  button[type='submit']:hover {
    filter: brightness(1.03);
  }
  button[type='submit']:active {
    transform: translateY(1px);
  }
`

const BoardConfigForm = ({
  form,
  errors,
  pending,
  action,
  onChange,
  onKeyValue,
}) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <input type="hidden" name="mode" value={form.mode} />
      <input type="hidden" name="active" value={form.active} />
      <input type="hidden" name="editor" value={form.editor} />
      <input type="hidden" name="imageUpload" value={form.imageUpload} />
      <input type="hidden" name="attachFile" value={form.attachFile} />
      <input type="hidden" name="comment" value={form.comment} />
      <input
        type="hidden"
        name="afterWritingRedirect"
        value={form.afterWritingRedirect}
      />
      <input type="hidden" name="showViewList" value={form.showViewList} />
      <input type="hidden" name="skin" value={form.skin} />
      <input type="hidden" name="listAuthority" value={form.listAuthority} />
      <input type="hidden" name="viewAuthority" value={form.viewAuthority} />
      <input type="hidden" name="writeAuthority" value={form.writeAuthority} />
      <input
        type="hidden"
        name="commentAuthority"
        value={form.commentAuthority}
      />

      <MessageBox color="danger">{errors?.global}</MessageBox>
      <TableCols thwidth={180}>
        <tbody>
          <tr>
            <th>게시판 아이디</th>
            <td>
              {form.mode === 'update' ? (
                <>
                  <input type="hidden" name="bid" value={form.bid} />
                  {form.bid}
                </>
              ) : (
                <Input
                  type="text"
                  name="bid"
                  value={form.bid}
                  onChange={onChange}
                />
              )}
              <MessageBox color="danger">{errors?.bid}</MessageBox>
            </td>
          </tr>
          <tr>
            <th>게시판 이름</th>
            <td>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
              />
              <MessageBox color="danger">{errors?.name}</MessageBox>
            </td>
          </tr>
          <tr>
            <th>사용여부</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('active', true)}
              >
                {form.active ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}{' '}
                사용
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('active', false)}
              >
                {!form.active ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                미사용
              </span>
            </td>
          </tr>
          <tr>
            <th>한페이지 행수</th>
            <td>
              <Input
                type="number"
                name="rowsForPage"
                value={form.rowsForPage}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <th>페이징 갯수</th>
            <td>
              <Input
                type="number"
                name="pageCount"
                value={form.pageCount}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <th>에디터 사용</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('editor', true)}
              >
                {form.editor ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                사용
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('editor', false)}
              >
                {!form.editor ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                미사용
              </span>
            </td>
          </tr>
          <tr>
            <th>이미지 업로드</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('imageUpload', true)}
              >
                {form.imageUpload ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                사용
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('imageUpload', false)}
              >
                {!form.imageUpload ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                미사용
              </span>
            </td>
          </tr>
          <tr>
            <th>파일 첨부</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('attachFile', true)}
              >
                {form.attachFile ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                사용
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('attachFile', false)}
              >
                {!form.attachFile ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                미사용
              </span>
            </td>
          </tr>
          <tr>
            <th>댓글 사용</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('comment', true)}
              >
                {form.comment ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                사용
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('comment', false)}
              >
                {!form.comment ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                미사용
              </span>
            </td>
          </tr>
          <tr>
            <th>글작성 후 이동</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('afterWritingRedirect', true)}
              >
                {form.afterWritingRedirect ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                글보기
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('afterWritingRedirect', false)}
              >
                {!form.afterWritingRedirect ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                글목록
              </span>
            </td>
          </tr>
          <tr>
            <th>글보기 하단 목록</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('showViewList', true)}
              >
                {form.showViewList ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                노출
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('showViewList', false)}
              >
                {!form.showViewList ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                미노출
              </span>
            </td>
          </tr>
        </tbody>
      </TableCols>
      <h2>분류 설정</h2>
      <TableCols thwidth={180}>
        <tbody>
          <tr>
            <th>분류</th>
            <td>
              <Textarea
                name="category"
                value={form.category}
                onChange={onChange}
                placeholder="여러개의 분류는 엔터로 줄개행하여 입력"
              />
            </td>
          </tr>
        </tbody>
      </TableCols>
      <h2>스킨 설정</h2>
      <TableCols thwidth={180}>
        <tbody>
          <tr>
            <th>스킨</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('skin', 'default')}
              >
                {form.skin === 'default' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                기본 스킨(default)
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('skin', 'gallery')}
              >
                {form.skin === 'gallery' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                갤러리 스킨(gallery)
              </span>
            </td>
          </tr>
        </tbody>
      </TableCols>
      <h2>권한 설정</h2>
      <TableCols thwidth={180} className="mb30">
        <tbody>
          <tr>
            <th>글목록 권한</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('listAuthority', 'ALL')}
              >
                {form.listAuthority === 'ALL' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                비회원 + 회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('listAuthority', 'MEMBER')}
              >
                {form.listAuthority === 'MEMBER' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('listAuthority', 'ADMIN')}
              >
                {form.listAuthority === 'ADMIN' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                관리자
              </span>
            </td>
          </tr>
          <tr>
            <th>글보기 권한</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('viewAuthority', 'ALL')}
              >
                {form.viewAuthority === 'ALL' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                비회원 + 회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('viewAuthority', 'MEMBER')}
              >
                {form.viewAuthority === 'MEMBER' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('viewAuthority', 'ADMIN')}
              >
                {form.listAuthority === 'ADMIN' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                관리자
              </span>
            </td>
          </tr>
          <tr>
            <th>글쓰기 권한</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('writeAuthority', 'ALL')}
              >
                {form.writeAuthority === 'ALL' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                비회원 + 회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('writeAuthority', 'MEMBER')}
              >
                {form.writeAuthority === 'MEMBER' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('writeAuthority', 'ADMIN')}
              >
                {form.writeAuthority === 'ADMIN' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                관리자
              </span>
            </td>
          </tr>
          <tr>
            <th>댓글 권한</th>
            <td>
              <span
                className="radio"
                onClick={() => onKeyValue('commentAuthority', 'ALL')}
              >
                {form.commentAuthority === 'ALL' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                비회원 + 회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('commentAuthority', 'MEMBER')}
              >
                {form.commentAuthority === 'MEMBER' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                회원 + 관리자
              </span>
              <span
                className="radio"
                onClick={() => onKeyValue('commentAuthority', 'ADMIN')}
              >
                {form.commentAuthority === 'ADMIN' ? (
                  <MdOutlineRadioButtonChecked />
                ) : (
                  <MdOutlineRadioButtonUnchecked />
                )}
                관리자
              </span>
            </td>
          </tr>
        </tbody>
      </TableCols>
      <SubmitButton type="submit" disabled={pending} width={250} color="dark">
        {form.mode === 'update' ? '수정하기' : '등록하기'}
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(BoardConfigForm)
