'use client'
import React from 'react'
import styled from 'styled-components'
import type { Hospital } from '@/app/tmap/types/Hospital'

const TableWrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px; /* 패딩 줄임 */
  background: #fff;
  border-radius: 10px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px; /* 글자 조금 줄임 */
    text-align: center;
  }

  thead {
    background: #f1f3f5;
    border-bottom: 1px solid #ddd;
  }

  th,
  td {
    padding: 10px 8px; /* 세로 패딩 줄임 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #f1f3f5;
  }

  th:last-of-type,
  td:last-of-type {
    border-right: none;
  }

  tbody tr:hover {
    background: #f9fafb;
  }

  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 30%;
    font-weight: 600;
  }

  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 50%;
  }

  th:nth-of-type(3),
  td:nth-of-type(3) {
    width: 10%;
    font-weight: 500;
  }
`

interface PropType {
  hospitals: Hospital[]
}

const SearchERInfo = ({ hospitals }: PropType) => {
  return (
    <TableWrap>
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
