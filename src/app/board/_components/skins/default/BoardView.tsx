'use client'
import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import type { BoardViewType } from '@/app/board/_types/BoardType'
import { nl2br } from '@/app/_global/libs/commons'
import FileItems from '@/app/_global/components/FileItems'
import color from '@/app/_global/styles/color'
import fontsize from '../../../../_global/styles/fontsize'

const { danger, info, white } = color
const { medium, normal } = fontsize

const Wrapper = styled.ul`
  li + li {
    margin-top: 10px;
  }

  li {
    border: 1px solid #ffe89a;
    border-radius: 8px;
    padding: 15px;
    background: #ffffff;

    &.subject {
      font-size: ${medium};
      padding: 18px 16px;
      border-width: 2px;
      border-color: #ffd93d;

      span {
        margin-right: 6px;
        display: inline-block;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: ${normal};
        color: #000000;
        line-height: 1;

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

    &.post-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #212529;

      .left span {
        margin-right: 12px;
      }
      .right span {
        margin-left: 12px;
      }
    }

    &.content {
      word-break: break-all;
      margin-bottom: 10px;
      min-height: 350px;
      background: #ffffff;
    }
  }
`

const StyledLinks = styled.div`
  margin: 14px 0 4px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 6px;
  height: 45px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    padding: 0 16px;
    font-size: ${medium};
    border-radius: 10px;
    border: 1px solid #ffe89a;
    transition: filter 0.15s ease, transform 0.05s ease, background 0.15s ease,
      color 0.15s ease;

    &:hover {
      filter: brightness(1.02);
    }
    &:active {
      transform: translateY(1px);
    }

    &.btn1 {
      background: #ffffff;
      color: #212529;
    }

    &.btn2 {
      background: #000000;
      color: #ffffff;
      border-color: #000000;
    }

    &.btn3 {
      background: #ffd166;
      color: #000000;
      border-color: #ffd166;
    }

    &.btn4 {
      background: #ffd93d;
      color: #000000;
      border-color: #ffd93d;
    }
  }
`

const BoardView = ({ board, data, onDelete }: BoardViewType) => {
  return (
    data && (
      <>
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
                {data.member && '(' + data.member.email + ')'}
              </span>
            </div>
            <div className="right">
              <span>조회수: {data?.viewCount?.toLocaleString()}</span>
              {data.createdAt && (
                <span>
                  작성일시: {format(data.createdAt, 'yyyy.MM.dd HH:mm')}
                </span>
              )}
            </div>
          </li>
          {data.content && (
            <li
              className="content"
              dangerouslySetInnerHTML={{
                __html: data.plainText ? nl2br(data.content) : data.content,
              }}
            />
          )}
        </Wrapper>
        <FileItems items={data.attachFiles} />
        <StyledLinks>
          {board?.listable && (
            <a href={'/board/list/' + board.bid} className="btn1">
              글목록
            </a>
          )}
          {data.editable && (
            <>
              <a className="btn2" onClick={onDelete}>
                글삭제
              </a>
              <a href={'/board/update/' + data.seq} className="btn3">
                글수정
              </a>
            </>
          )}
          {board?.writable && (
            <a href={'/board/write/' + board.bid} className="btn4">
              글쓰기
            </a>
          )}
        </StyledLinks>
      </>
    )
  )
}

export default React.memo(BoardView)
