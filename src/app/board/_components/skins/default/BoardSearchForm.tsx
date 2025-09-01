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
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 10px 0;
  border-bottom: 1px solid #ffe89a;

  .left {
    display: flex;
    align-items: center;
    gap: 6px;

    select,
    input {
      height: 40px;
      background: #ffffff;
      border: 1px solid #ffe89a;
      border-radius: 10px;
      padding: 0 12px;
      outline: none;
      transition: box-shadow 0.15s ease, border-color 0.15s ease;
    }

    select {
      min-width: 110px;
      appearance: none;
      background-image: none;
    }

    input {
      width: 300px;
    }

    select:focus,
    input:focus {
      border-color: #ffd93d;
      box-shadow: 0 0 0 3px rgba(255, 217, 61, 0.25);
    }

    button {
      height: 40px;
      padding: 0 18px;
      border: 0;
      border-radius: 10px;
      background: #ffd93d;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: filter 0.15s ease, transform 0.05s ease;

      &:hover {
        filter: brightness(1.05);
      }
      &:active {
        transform: translateY(1px);
      }

      svg {
        font-size: 1.7rem;
        color: #ffffff;
        position: relative;
        top: 2px;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    a {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      min-width: 90px;
      padding: 0 14px;
      background: #ffd93d;
      color: #000000;
      font-size: ${medium};
      text-align: center;
      border-radius: 10px;
      border: 1px solid #ffe89a;
      transition: filter 0.15s ease, transform 0.05s ease;

      &:hover {
        filter: brightness(1.02);
      }
      &:active {
        transform: translateY(1px);
      }
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
