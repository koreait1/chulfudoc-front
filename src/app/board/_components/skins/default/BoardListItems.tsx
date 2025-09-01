'use client'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { BoardDataType } from '@/app/board/_types/BoardType'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'

const { small } = fontSize

const StyledItems = styled.ul`
  li {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #ffe89a;
    padding: 0 10px;

    &:first-of-type {
      border-top: 1px solid #ffe89a;
    }

    &:hover {
      background: #fffcee;
    }

    .post-info {
      min-width: 350px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #212529;
      span + span {
        margin-left: 10px;
      }
    }

    .subject {
      flex-grow: 1;
      display: flex;
      align-items: center;
      color: #000000;

      div {
        width: calc(100% - 1px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        span {
          display: inline-block;
          padding: 7px 10px;
          line-height: 1px;
          border-radius: 5px;
          margin-right: 3px;
          color: #000000;
          font-size: ${small};

          &.notice {
            background: #ffd93d;
            border: 1px solid #ffea9c;
          }

          &.category {
            background: #ffd166;
            border: 1px solid #ffe089;
          }
        }
      }

      &:hover div {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  .no-data {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    background: #fff8cc;
    border: 1px dashed #ffe89a;
    border-radius: 8px;
    margin-top: 10px;
  }
`

const BoardItem = ({ item }) => {
  const {
    seq,
    subject,
    category,
    notice,
    poster,
    member,
    viewCount,
    createdAt,
  } = item

  const dateStr = useMemo(() => {
    const gap = Date.now() - createdAt.getTime()
    const hours = Math.ceil(gap / (60 * 60 * 1000))
    const mins = Math.floor(gap / (60 * 1000))
    if (mins < 1) return '방금전'

    return hours >= 6
      ? format(createdAt, 'yyyy.MM.dd HH:mm')
      : formatDistanceToNow(createdAt, { locale: ko }) + '전'
  }, [createdAt])
  return (
    <li>
      <a href={'/board/view/' + seq} className="subject">
        <div>
          {notice && <span className="notice">공지</span>}
          {category && <span className="category">{category}</span>}
          {subject}
        </div>
      </a>
      <span className="post-info">
        <span>
          {poster}
          {member && '(' + member.email + ')'}
        </span>
        <span>{dateStr}</span>
        {viewCount > 0 && <span>{viewCount.toLocaleString()}</span>}
      </span>
    </li>
  )
}

const BoardListItems = ({ items }: { items?: Array<BoardDataType> }) => {
  return (
    <StyledItems>
      {items && items.length > 0 ? (
        items.map((item) => (
          <BoardItem key={'board-item-' + item.seq} item={item} />
        ))
      ) : (
        <li className="no-data">조회된 게시글이 없습니다.</li>
      )}
    </StyledItems>
  )
}

export default React.memo(BoardListItems)
