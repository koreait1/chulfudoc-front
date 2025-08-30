'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Papa from 'papaparse'
import SearchERInfo from '../_components/SearchERInfo'
import ERSearchForm from '../_components/ERSearchForm'
import Pagination from '@/app/_global/components/Pagination'
import type { Hospital } from '../types/SearchERInfoTypes'

interface PaginationType {
  pages: Array<[string, string]>
  page: number
  prevRangePage: number
  nextRangePage: number
  lastPage: number
  baseUrl: string
}

interface SearchProps {
  initialKeyword?: string
  initialOption?: 'ALL' | 'NAME' | 'ADDR'
}

export default function SearchERInfoContainer({ initialKeyword = '', initialOption = 'ALL' }: SearchProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([])
  const [keyword, setKeyword] = useState(initialKeyword)
  const [option, setOption] = useState<'ALL' | 'NAME' | 'ADDR'>(initialOption)

  // Pagination 상태
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // CSV 불러오기
  useEffect(() => {
    Papa.parse('/ERPlusPlus.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data.filter((h: Hospital) => h.응급의료기관명)
        setHospitals(data)
        setFilteredHospitals(data)
        setupPagination(data, 1)
      },
    })
  }, [])

  // 검색
  const handleSearch = useCallback(() => {
    const filtered = hospitals.filter((h) => {
      const nameMatch = h.응급의료기관명?.includes(keyword)
      const addrMatch = h.소재지?.includes(keyword)
      if (option === 'ALL') return nameMatch || addrMatch
      if (option === 'NAME') return nameMatch
      if (option === 'ADDR') return addrMatch
      return false
    })
    setFilteredHospitals(filtered)
    setCurrentPage(1)
    setupPagination(filtered, 1)
  }, [hospitals, keyword, option])

  // Pagination 세팅
  const setupPagination = (data: Hospital[], page: number) => {
    const totalPage = Math.ceil(data.length / itemsPerPage)
    const pageGroupSize = 10 // 한 번에 보여줄 페이지 버튼 개수
    const currentGroup = Math.floor((page - 1) / pageGroupSize)
    const startPage = currentGroup * pageGroupSize + 1
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPage)

    const pagesArray: Array<[string, string]> = []
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push([String(i), `?page=${i}`])
    }

    setPagination({
      pages: pagesArray,
      page,
      prevRangePage: startPage > 1 ? startPage - 1 : 0, // 이전 10페이지 그룹
      nextRangePage: endPage < totalPage ? endPage + 1 : 0, // 다음 10페이지 그룹
      lastPage: totalPage,
      baseUrl: '?page=',
    })
  }

  // 페이지 클릭
  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    if (filteredHospitals.length > 0) {
      setupPagination(filteredHospitals, page)
    }
  }

  // 현재 페이지 데이터 (10개씩)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentHospitals = filteredHospitals.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>응급의료기관 검색</h1>
      <ERSearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        option={option}
        setOption={setOption}
        onSearch={handleSearch}
      />

      <SearchERInfo hospitals={currentHospitals} />

      {pagination && pagination.pages.length > 0 && (
        <Pagination pagination={pagination} onClick={handlePageClick} />
      )}
    </>
  )
}
