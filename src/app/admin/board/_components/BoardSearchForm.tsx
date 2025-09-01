'use client'
import React from 'react'
import styled from 'styled-components'
import { Input, Select, TableCols } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'

const StyledForm = styled.form`
  margin: 12px 0 18px;

  .row {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid #ffe89a;
  }

  .label {
    width: 100px;
    padding-right: 12px;
    border-right: 1px solid #ffe89a;
    color: #111111;
    font-weight: 700;
    white-space: nowrap;
  }

  .controls {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    flex: 1;
    padding-left: 12px;
  }

  select,
  input {
    height: 40px;
    line-height: 40px;
    content-justify: center;
    margin: 0;
  }
  select {
    width: 105px;
  }

  select:focus,
  input[type='text']:focus {
    border-color: #ffd93d !important;
  }

  .actions {
    padding-left: 12px;
    border-left: 1px solid #ffe89a;
    display: flex;
    align-items: flex-end;
  }
  .ghost {
    height: 36px;
    padding: 0 14px !important;
    border-radius: 8px !important;
    background: transparent !important;
    border: 1px solid #ffe89a !important;
    color: #111111 !important;
    font-weight: 600;
  }
  .ghost:hover {
    background: #fffcee !important;
  }
  .ghost:active {
    transform: translateY(1px);
  }
`

const BoardSearchForm = ({ search }) => {
  return (
    <StyledForm method="GET" autoComplete="off" className="mb30">
      <TableCols thwidth={120} className="mb30">
        <tbody>
          <tr>
            <th>키워드 검색</th>
            <td className="flex">
              <Select
                name="sopt"
                className="w120 mr5"
                defaultValue={search.sopt}
              >
                <option defaultValue="ALL">통합검색</option>
                <option defaultValue="BID">게시판 ID</option>
                <option defaultValue="NAME">게시판이름</option>
              </Select>
              <Input
                type="text"
                name="skey"
                defaultValue={search.skey ?? ''}
                placeholder="검색 키워드를 입력하세요."
              />
            </td>
          </tr>
        </tbody>
      </TableCols>
      <SubmitButton type="submit" width={250}>
        검색하기
      </SubmitButton>
    </StyledForm>
  )
}

export default React.memo(BoardSearchForm)
