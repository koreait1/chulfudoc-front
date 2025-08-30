'use client'
import React from 'react'
import styled from 'styled-components'
import type { Hospital } from '../types/SearchERInfoTypes'

const TableWrap = styled.div`
  min-width: 600px;
  max-width: 1150px;
  margin: 20px auto 0; /* 지도와 간격 */
  padding: 20px;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    text-align: center;
  }

  thead {
    background: #f8f9fa;
    border-top: 2px solid #333;
    border-bottom: 1px solid #ddd;
  }

  th,
  td {
    padding: 14px 10px;
    border-bottom: 1px solid #eee;

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

  /* 각 열 비율 */
  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 35%; /* 기관명 */
    font-weight: bold;
  }

  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 50%; /* 소재지 */
  }

  th:nth-of-type(3) {
    width: 15%; /* 연락처 */
    font-weight: 500;
  }
  td:nth-of-type(3) {
    width: 15%; /* 연락처 */
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
