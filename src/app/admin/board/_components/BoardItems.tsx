'use client'
import React from 'react'
import styled from 'styled-components'
import type { BoardConfigType } from '@/app/board/_types/BoardType'
import { TableRows } from '@/app/_global/components/Forms'
import { Button } from '@/app/_global/components/Buttons'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

const StyledForm = styled.form`
  ${TableRows} {
    width: 100%;
    border-top: 2px solid #ffe89a;
    border-bottom: 1px solid #ffe89a;
    background: #ffffff;
    border-collapse: separate;
    border-spacing: 0;
  }

  thead th {
    height: 44px;
    background: #fff8cc;
    color: #111111;
    font-weight: 700;
    border-bottom: 1px solid #ffe89a;
  }

  tbody td {
    height: 46px;
    border-bottom: 1px solid #fff3b8;
    color: #212529;
    text-align: center;
  }

  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 48px;
  }
  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 160px;
  }
  th:nth-of-type(3),
  td:nth-of-type(3) {
    width: 280px;
    text-align: left;
  }

  tbody tr:nth-of-type(odd) td {
    background: #fffcf0;
  }
  tbody tr:hover td {
    background: #fffcee;
  }

  .cell-check {
    cursor: pointer;
    user-select: none;
    svg {
      font-size: 1.4rem;
      vertical-align: middle;
    }
  }

  td:last-of-type {
    text-align: left;
    white-space: nowrap;

    a + a {
      margin-left: 6px;
    }
  }

  .table-action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 10px 12px;
    border-top: 1px dashed #ffe89a;
    background: #fffef6;
    border-radius: 0 0 12px 12px;
  }

  button {
    height: 34px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid #ffe89a;
    background: #ffd93d;
    color: #000000;
    font-weight: 600;
    transition: filter 0.15s ease, transform 0.05s ease;
  }
  button:hover {
    filter: brightness(1.03);
  }
  button:active {
    transform: translateY(1px);
  }

  td:last-of-type a:nth-of-type(2) button {
    background: #ffd166;
    border-color: #ffd166;
  }
`

const BoardItems = ({
  items,
  onToggle,
  isCheckAll,
  onRemove,
}: {
  items?: Array<BoardConfigType>
  onToggle: (bid?: string, mode?: 'check' | 'uncheck') => void
  onRemove: () => void
  isCheckAll: boolean
}) => {
  return (
    <StyledForm autoComplete="off">
      <TableRows>
        <thead>
          <tr>
            <th
              onClick={() =>
                onToggle(undefined, isCheckAll ? 'uncheck' : 'check')
              }
            >
              {isCheckAll ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </th>
            <th>게시판ID</th>
            <th>게시판이름</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map(({ chk, bid, name }) => (
              <tr key={'board-' + bid}>
                <td onClick={() => onToggle(bid)}>
                  {chk ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </td>
                <td>{bid}</td>
                <td>{name}</td>
                <td>
                  <a href={'/admin/board/update/' + bid}>
                    <Button type="button">설정수정</Button>
                  </a>
                  <a href={'/board/list/' + bid} target="_blank">
                    <Button type="button" color="info">
                      미리보기
                    </Button>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="no-data">
                조회된 게시판이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </TableRows>
      {items && items.length > 0 && (
        <div className="table-action">
          <Button type="button" color="warning" width={200} onClick={onRemove}>
            선택한 게시판 삭제하기
          </Button>
        </div>
      )}
    </StyledForm>
  )
}

export default React.memo(BoardItems)
