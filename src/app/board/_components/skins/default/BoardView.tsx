'use client'
import React from 'react'
import styled from 'styled-components'
import type { BoardViewType } from '@/app/board/_types/BoardType'

const Wrapper = styled.ul``

const BoardView = ({ board, data }: BoardViewType) => {
  return (
    data && (
      <Wrapper>
        <li className="post-info">
          <div className="left">
            <span>
              작성자:{data.poster}
              {data.member && '(' + data.member.userId + ')'}
            </span>
            <span>IP: {data.ip}</span>
          </div>
          <div className="right">
            {data.viewCount && (
              <span>조회수: {data.viewCount.toLocaleString()}</span>
            )}
            <span>작성일시: </span>
          </div>
        </li>
      </Wrapper>
    )
  )
}

export default React.memo(BoardView)
