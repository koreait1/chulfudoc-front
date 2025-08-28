'use client'
import React from 'react'
import styled from 'styled-components'

const SearchFormWrapper = styled.div`
  text-align: center;
  margin-bottom: 10px;

  select,
  input {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-right: 5px;
  }

  button {
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`

interface Props {
  keyword: string
  setKeyword: (value: string) => void
  option: 'ALL' | 'NAME' | 'ADDR'
  setOption: (value: 'ALL' | 'NAME' | 'ADDR') => void
  onSearch: () => void
}

export default function SearchForm({
  keyword,
  setKeyword,
  option,
  setOption,
  onSearch,
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <SearchFormWrapper>
      <select
        value={option}
        onChange={(e) => setOption(e.target.value as 'ALL' | 'NAME' | 'ADDR')}
      >
        <option value="ALL">통합검색</option>
        <option value="NAME">병원명</option>
        <option value="ADDR">주소</option>
      </select>
      <input
        type="text"
        placeholder="검색 키워드 입력 후 Enter"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={onSearch}>
        검색하기
      </button>
    </SearchFormWrapper>
  )
}
