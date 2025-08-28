'use client'
import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import type { BoardViewType } from '@/app/board/_types/BoardType'
import { nl2br } from '@/app/_global/libs/commons'
import FileItems from '@/app/_global/components/FileItems'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'

const Wrapper = styled.ul`
  li + li {
    margin-top: 10px;
  }
`

const BoardView = ({ board, data }: BoardViewType) => {
  return (
    data && (
      <Wrapper>
        <li className="subject">
          {data.notice && <span className="notice">공지</span>}
          {data.category && <span className="category">{data.category}</span>}

          {data.subject}
        </li>

        <li className="post-info">
          <div className="left">
            <span>
              작성자: {data.poster}
              {data.member && '(' + data.member.userId + ')'}
            </span>
            <span>IP: {data.ip}</span>
          </div>

          <div className="right">
            <span>조회수: {data?.viewCount?.toLocaleString()}</span>
            {data.createdAt && (
              <span>
                작성일시: {format(data.createdAt, 'yyyy.MM.dd HH:mm')}{' '}
              </span>
            )}
          </div>
        </li>

        <li
          className="content"
          dangerouslySetInnerHTML={{
            __html: data.plainText ? nl2br(data.content) : data.content,
          }}
        />
        <FileItems items={data.attachFiles} />
        <div className="links">
          {board?.listable && <a href={'/board/list/' + board.bid}>글목록</a>}
          {data.editable && (
            <>
              <a href={'/board/delete' + data.seq}>삭제</a>
              <a href={'/board/update/' + data.seq}>수정</a>
            </>
          )}
          {board?.writable && <a href={'/board/write/' + board.bid}>글쓰기</a>}
        </div>
      </Wrapper>
    )
  )
}

export default React.memo(BoardView)
