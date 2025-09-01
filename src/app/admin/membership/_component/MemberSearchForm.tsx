'use client'
import React from 'react'
import styled from 'styled-components'
import { Input, Select, TableCols } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'

const StyledForm = styled.form`
  .search {
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
  }
`

type SearchType = {
  sopt?: 'ALL' | 'EMAIL' | 'NAME' | 'MOBILE' | 'ID'
  skey?: string
  authorities?: string[] | string
}

const MemberSearchForm = ({ search = {} as SearchType }) => {
  const toSet = (v: string[] | string | undefined) =>
    new Set(Array.isArray(v) ? v : v ? [v] : [])
  const authSet = toSet(search.authorities)

  const hasAuth = (key: string) => authSet.has(key)

  return (
    <StyledForm method="GET" autoComplete="off" className="mb30">
      <TableCols thwidth={120} className="mb30">
        <tbody>
          <tr className="search">
            <th>키워드 검색</th>
            <td className="flex">
              <Select
                name="sopt"
                className="w140 mr5"
                defaultValue={search.sopt ?? 'ALL'}
              >
                <option value="ALL">통합검색</option>
                <option value="EMAIL">이메일</option>
                <option value="NAME">이름</option>
                <option value="MOBILE">휴대폰</option>
                <option value="ID">아이디</option>
              </Select>
              <Input
                name="skey"
                defaultValue={search.skey ?? ''}
                placeholder="검색 키워드를 입력하세요."
              />
            </td>
          </tr>

          <tr className="authority">
            <th>권한</th>
            <td className="flex" style={{ gap: 12, alignItems: 'center' }}>
              <label>
                <input
                  type="checkbox"
                  name="authorities"
                  value="ADMIN"
                  defaultChecked={hasAuth('ADMIN')}
                />{' '}
                ADMIN
              </label>
              <label>
                <input
                  type="checkbox"
                  name="authorities"
                  value="MEMBER"
                  defaultChecked={hasAuth('MEMBER')}
                />{' '}
                MEMBER
              </label>
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

export default React.memo(MemberSearchForm)
