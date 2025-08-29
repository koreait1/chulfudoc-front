'use client'
import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import {
  MdFirstPage,
  MdLastPage,
  MdArrowBackIos,
  MdArrowForwardIos,
} from 'react-icons/md'
import color from '../styles/color'
import fontSize from '../styles/fontsize'

const { medium } = fontSize
const { black, white } = color

const Wrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 6px;
  height: 48px;

  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 42px;
    height: 42px;
    font-size: ${medium};
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid ${black};
    color: ${black};
    background: ${white};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${black};
      color: ${white};
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    }

    &.on {
      background: ${black};
      color: ${white};
      font-weight: 600;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }

    svg {
      font-size: 20px;
    }
  }
`

type PropType = {
  pagination?: any
  onClick?: (page: number) => void
}

const PageItem = ({
  pages,
  page,
  onClick,
  icon,
}: {
  pages: Array<string>
  page: number
  onClick?: (page: number) => void
  icon?: React.ReactNode
}) => {
  return onClick ? (
    <span
      onClick={() => onClick(Number(pages[0]))}
      className={classNames('page', { on: page === Number(pages[0]) })}
    >
      {icon ? icon : pages[0]}
    </span>
  ) : (
    <a
      href={pages[1]}
      className={classNames('page', { on: page === Number(pages[0]) })}
    >
      {icon ? icon : pages[0]}
    </a>
  )
}

const Pagination = ({ pagination, onClick }: PropType) => {
  if (!pagination || pagination.pages.length === 0) return <></>
  const { pages, page, prevRangePage, nextRangePage, lastPage, baseUrl } =
    pagination

  return (
    <Wrapper>
      {prevRangePage > 0 && (
        <>
          <PageItem
            pages={['1', `${baseUrl}1`]}
            page={page}
            onClick={onClick}
            icon={<MdFirstPage />}
          />
          <PageItem
            pages={[prevRangePage, `${baseUrl}${prevRangePage}`]}
            page={page}
            onClick={onClick}
            icon={<MdArrowBackIos />}
          />
        </>
      )}
      {pages.map((p) => (
        <PageItem
          key={'page-' + p[0]}
          pages={p}
          page={page}
          onClick={onClick}
        />
      ))}
      {nextRangePage > 0 && (
        <>
          <PageItem
            pages={[nextRangePage, `${baseUrl}${nextRangePage}`]}
            page={page}
            icon={<MdArrowForwardIos />}
            onClick={onClick}
          />
          <PageItem
            pages={[lastPage, `${baseUrl}${lastPage}`]}
            page={page}
            icon={<MdLastPage />}
            onClick={onClick}
          />
        </>
      )}
    </Wrapper>
  )
}

export default React.memo(Pagination)
