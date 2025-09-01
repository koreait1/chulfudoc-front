'use client'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import type { CommentDataType } from '@/app/board/_types/CommentType'
import { format } from 'date-fns'
import { nl2br } from '@/app/_global/libs/commons'
import useConfirmDialog from '@/app/_global/hooks/useConfirmDialog'
import color from '@/app/_global/styles/color'

const { danger, primary, white } = color

const StyledItems = styled.ul`
  margin-bottom: 30px;

  li {
    border: 1px solid #ffe89a;
    padding: 14px;
    border-radius: 10px;
    background: #ffffff;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      color: #212529;
      font-size: 0.95rem;
    }

    .content {
      padding: 12px;
      border-radius: 10px;
      background: #fff8cc;
      min-height: 80px;
      color: #000000;
      line-height: 1.6;
      word-break: break-word;
    }

    .links {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      height: 40px;
      padding-top: 10px;

      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        padding: 0 14px;
        line-height: 36px;
        border-radius: 10px;
        border: 1px solid #ffe89a;
        cursor: pointer;
        font-weight: 600;
        transition: filter 0.15s ease, transform 0.05s ease,
          background 0.15s ease, color 0.15s ease;

        &:hover {
          filter: brightness(1.02);
        }
        &:active {
          transform: translateY(1px);
        }
      }

      .btn1 {
        background: #000000;
        color: #ffffff;
        border-color: #000000;
      }

      .btn2 {
        background: #ffd166;
        color: #000000;
        border-color: #ffd166;
      }
    }
  }

  li + li {
    margin-top: 10px;
  }
`

const CommentItem = ({ item }: { item: CommentDataType }) => {
  const { seq, commenter, member, content, createdAt, editable } = item
  const confirmDialog = useConfirmDialog()
  const router = useRouter()

  const onDelete = useCallback(
    (e) => {
      e.preventDefault()
      confirmDialog({
        text: '정말 삭제하겠습니까?',
        confirmCallback: () => {
          router.push(`/board/comment/delete/${seq}`)
        },
      })
    },
    [confirmDialog, router, seq],
  )

  return (
    <li>
      <div className="top">
        <div className="left">
          {commenter}
          {member && '(' + member.email + ')'}
        </div>
        {createdAt && (
          <div className="right">{format(createdAt, 'yyyy.MM.dd HH:mm')}</div>
        )}
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: nl2br(content) }}
      />
      {editable && (
        <div className="links">
          <a className="btn1" onClick={onDelete}>
            삭제
          </a>
          <a className="btn2" href={'/board/comment/' + seq}>
            수정
          </a>
        </div>
      )}
    </li>
  )
}

const CommentItems = ({ items }: { items?: Array<CommentDataType> }) => {
  return (
    items &&
    items.length > 0 && (
      <StyledItems>
        {items.map((item) => (
          <CommentItem key={'comment-' + item.seq} item={item} />
        ))}
      </StyledItems>
    )
  )
}

export default React.memo(CommentItems)
