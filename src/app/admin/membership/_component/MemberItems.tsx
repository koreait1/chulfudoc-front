'use client'
import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/_global/components/Forms'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

export type MemberType = {
  puuid: string
  userId?: string
  email?: string
  name?: string
  mobile?: string
  socialChannel?: string | string[]
  socialProviders?: string[]
  chk?: boolean
}

const StyledForm = styled.form`
  ${TableRows} {
    width: 100%;
    border-top: 2px solid #ffe89a;
    border-bottom: 1px solid #ffe89a;
    border-collapse: collapse;
    background: #ffffff;
  }

  thead th {
    height: 44px;
    background: #fff8cc;
    border-bottom: 1px solid #ffe89a;
    font-weight: 700;
    color: #111111;
    text-align: center;
  }

  tbody td {
    height: 44px;
    border-bottom: 1px solid #fff3b8;
    text-align: center;
    color: #212529;
    font-size: 0.95rem;
  }

  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 48px;
  }
  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 220px;
    text-align: left;
  }
  th:nth-of-type(3),
  td:nth-of-type(3) {
    width: 140px;
  }
  th:nth-of-type(4),
  td:nth-of-type(4) {
    width: 140px;
  }
  th:nth-of-type(5),
  td:nth-of-type(5) {
    width: 220px;
    text-align: left;
  }
  th:nth-of-type(6),
  td:nth-of-type(6) {
    width: 160px;
  }
  th:nth-of-type(7),
  td:nth-of-type(7) {
    width: 160px;
  }

  tbody tr:nth-of-type(odd) td {
    background: #fffcf0;
  }
  tbody tr:hover td {
    background: #fffcee;
  }

  td:first-of-type,
  th:first-of-type {
    cursor: pointer;
    user-select: none;
  }
  td:first-of-type svg,
  th:first-of-type svg {
    font-size: 1.3rem;
    vertical-align: middle;
  }

  .no-data {
    padding: 40px 0;
    text-align: center;
    color: #888;
    font-size: 0.95rem;
    background: #fffef6;
  }
`

const getSocial = (row: MemberType) => {
  const s = row.socialChannel ?? row.socialProviders
  if (!s) return '-'
  return Array.isArray(s) ? (s.length ? s.join(', ') : '-') : String(s)
}

function MemberItems({
  items,
  onToggle,
  isCheckAll,
}: {
  items?: Array<MemberType>
  onToggle: (memberId?: string, mode?: 'check' | 'uncheck') => void
  isCheckAll: boolean
}) {
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
            <th>PUUID</th>
            <th>회원 이름</th>
            <th>ID</th>
            <th>E-mail</th>
            <th>연락처</th>
            <th>소셜 연동</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((row) => (
              <tr key={'member-' + row.puuid}>
                <td onClick={() => onToggle(row.puuid)}>
                  {row.chk ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </td>
                <td>{row.puuid}</td>
                <td>{row.name || '-'}</td>
                <td>{row.userId || '-'}</td>
                <td>{row.email || '-'}</td>
                <td>{row.mobile || '-'}</td>
                <td>{getSocial(row)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                조회된 회원이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </TableRows>
    </StyledForm>
  )
}

export default React.memo(MemberItems)
