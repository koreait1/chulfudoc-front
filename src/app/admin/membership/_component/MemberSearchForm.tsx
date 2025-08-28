'use client'
import React from "react"
import styled from "styled-components"
import { Select, Input, TableCols } from "@/app/_global/components/Forms"

const StyledForm = styled.form`

`

const MemberSearchForm = ({ search }) => {
    return(
        <StyledForm>
            <TableCols thwidth={120} className="mb30">
                    <tbody>
                      <tr>
                        <th>회원 검색</th>
                        <td className="flex">
                          <Select name="sopt" className="w120 mr5" defaultValue={search.sopt}>
                            <option defaultValue="ALL">통합검색</option>
                            <option defaultValue="NAME">회원 이름</option>
                            <option defaultValue="ID">아이디</option>
                            <option defaultValue="EMAIL">이메일</option>
                            <option defaultValue="MOBILE">연락처</option>
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
        </StyledForm>
    )
}

export default React.memo(MemberSearchForm)