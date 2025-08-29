'use client'
import Pagination from '@/app/_global/components/Pagination'
import useFetchCSR from '@/app/_global/hooks/useFetchCSR'
import useUser from '@/app/_global/hooks/useUser'
import React, { useEffect, useState } from 'react'
interface PaginationType {
  pages: Array<[string, string]>
  page: number
  prevRangePage: number
  nextRangePage: number
  lastPage: number
  baseUrl: string
}
const WrittenData = () => {
  const [items, setItems] = useState<any[]>([])
  const { loggedMember, isLogin } = useUser()
  const fetchCSR = useFetchCSR()
  const userId = loggedMember.userId
  useEffect(() => {
    if (!isLogin || !userId) return
    fetchCSR(`/board/mypage/search?userId=${userId}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
  }, [fetchCSR, isLogin, userId])
  if (!isLogin) return <></>
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20
  const setupPagination = (data: typeof items[], page: number) => {
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
    })}
  const handlePageClick = (page: number) => {
    setCurrentPage(page)
    if (items.length > 0) {
      setupPagination(items, page)
    }
  }
  return (
      {items.length ? (
        items.map(({ seq, subject, createdAt }) => (
    <>
          <li key={'board-' + seq}>
            <a href="/view/{seq}">{subject}</a>
            <span>{createdAt}</span>
          </li>
          <li>
      <Pagination pagination={pagination} onClick={handlePageClick} /></li>
    </>
        ))
      ) : (
    <>
        <li key="" className="noCon">
          작성하신 글이 없습니다.
        </li>
    </>
      )}
  )
}

export default React.memo(WrittenData)
