'use client'
import React from 'react'
import styled from 'styled-components'
import type { BoardConfigType } from '@/app/board/_types/BoardType'

const Wrap = styled.nav`
  margin: 8px 0 18px;
  padding-bottom: 2px;
  border-bottom: 1px solid #ffe89a;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffe89a;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #fff8cc;
  }

  .tabs {
    display: inline-flex;
    gap: 8px;
    padding: 4px 2px 10px 2px;
    white-space: nowrap;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    height: 36px;
    padding: 0 14px;
    font-weight: 600;
    border-radius: 18px;
    border: 1px solid #ffe89a;
    background: #ffffff;
    color: #000000;
    transition: background 0.15s ease, color 0.15s ease, filter 0.15s ease,
      transform 0.05s ease;

    &:hover {
      background: #fffcee;
    }
    &:active {
      transform: translateY(1px);
    }

    &.on {
      background: #ffd93d;
      border-color: #ffd93d;
      color: #000000;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
    }
  }
`

type Props = {
  boards?: Array<BoardConfigType>
  activeBid?: string
}

export default function BoardTabs({ boards, activeBid }: Props) {
  if (!boards || boards.length === 0) return null
  return (
    <Wrap>
      <div className="tabs">
        {boards.map((b) => (
          <a
            key={b.bid}
            href={`/board/list/${b.bid}`}
            className={b.bid === activeBid ? 'on' : undefined}
            title={b.name}
          >
            {b.name ?? b.bid}
          </a>
        ))}
      </div>
    </Wrap>
  )
}
