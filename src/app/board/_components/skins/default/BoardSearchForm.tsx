'use client'
import React from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'
import type {
  BoardConfigType,
  BoardSearchType,
} from '@/app/board/_types/BoardType'
import { SubmitButton } from '@/app/_global/components/Buttons'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'

const { black, white, light, primary } = color
const { medium } = fontSize

const StyledForm = styled.form`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  height: 65px;
  justify-content: space-between;

  .left {
    display: flex;
    select,
    input {
      background: #fff;
      border: 1px solid ${black};
      margin-right: 5px;
    }

    input {
      padding: 0 10px;
      width: 300px;
    }

    button {
      background: ${black};
      border: 0;
      cursor: pointer;
      padding: 0 20px;

      svg {
        font-size: 1.7rem;
        color: ${white};
        position: relative;
        top: 2px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    a {
      display: block;
      height: 43px;
      line-height: 43px;
      width: 75px;
      background: ${primary};
      color: ${white};
      font-size: ${medium};
      text-align: center;
      border-radius: 3px;
    }
  }
`

const BoardSearchForm = ({
  search,
  board,
}: {
  search?: BoardSearchType
  board?: BoardConfigType
}) => {
  search = search ?? {}

  return (
    <StyledForm
      method="GET"
      action={'/board/list/' + board?.bid}
      autoComplete="off"
    >
      {search.category && (
        <input type="hidden" name="category" defaultValue={search.category} />
      )}
      <div className="left">
        <select name="sopt" defaultValue={search?.sopt}>
          <option value="ALL">통합검색</option>
          <option value="SUBJECT">제목</option>
          <option value="CONTENT">내용</option>
          <option value="SUBJECT_CONTENT">제목+내용</option>
          <option value="NAME">이름</option>
        </select>
        <input
          type="text"
          name="skey"
          defaultValue={search?.skey}
          placeholder="검색어를 입력하세요."
        />
        <button type="button">
          <MdSearch />
        </button>
      </div>
      {board?.writable && (
        <div className="right">
          <a href={'/board/write/' + board?.bid}>글작성</a>
        </div>
      )}
    </StyledForm>
  )
}

export default React.memo(BoardSearchForm)
