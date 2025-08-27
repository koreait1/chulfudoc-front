'use client'
import React from 'react'
import styled from 'styled-components'
import type { Hospital } from '../types/SearchERInfoTypes'

const TableWrap = styled.div`
  min-width: 600px;
  max-width: 1150px;
  padding: 40px 20px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    text-align: center;
  }

  thead {
    background: #f8f8f8;
    border-top: 2px solid #333;
    border-bottom: 1px solid #ccc;
  }

  th,
  td {
    padding: 12px 10px;
    border-bottom: 1px solid #e5e5e5;

    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    overflow: hidden; /* 넘치는 텍스트 숨김 */
    text-overflow: ellipsis; /* ... 표시 */

    /* 세로 구분선 추가 */
    border-right: 1px solid #ccc;
  }

  /* 마지막 열은 오른쪽 구분선 제거 */
  th:last-of-type,
  td:last-of-type {
    border-right: none;
  }

  /* 각 열 너비 비율 */
  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 35%; /* 기관명 */
  }

  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 50%; /* 소재지 */
  }

  th:nth-of-type(3),
  td:nth-of-type(3) {
    width: 15%; /* 연락처 */
  }
`

interface PropType {
  hospitals: Hospital[]
}

const SearchERInfo = ({ hospitals }: PropType) => {
  return (
    <TableWrap>
      <h1>응급의료기관 검색</h1>
      <table>
        <thead>
          <tr>
            <th>응급의료기관</th>
            <th>주소</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.length === 0 ? (
            <tr>
              <td colSpan={3}>검색 결과가 없습니다.</td>
            </tr>
          ) : (
            hospitals.map((h, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 'bold' }}>{h.응급의료기관명}</td>
                <td>{h.소재지}</td>
                <td>{h.연락처}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </TableWrap>
  )
}

export default React.memo(SearchERInfo)
