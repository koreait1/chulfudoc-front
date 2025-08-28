'use client'
import Link from 'next/link'

export default function MainLink() {
  return (
    <>
      <div className="board-link">
        <h1>게시판 링크</h1>
        <Link href="/board/notice" />
        <Link href="/board/freetalk" />
        <Link href="/board/exprience" />
      </div>
    </>
  )
}
