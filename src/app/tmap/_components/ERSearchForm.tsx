'use client'
import color from '@/app/_global/styles/color'
import React from 'react'
import styled from 'styled-components'
const { primary, dark } = color

const SearchFormWrapper = styled.div`
  text-align: center;
  justify-content: center;
  margin-bottom: 10px;

  select {
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0 15px;
  }
  input {
    padding: 0 10px 0 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-right: 5px;
    height: 40px;
    line-height: 40px;
  }

  button {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: none;
    border-radius: 6px;
    background-color: ${primary};
    color: ${dark};
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${primary}aa;
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
