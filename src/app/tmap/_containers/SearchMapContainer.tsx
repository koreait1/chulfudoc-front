'use client'
import React from 'react'
import SearchERMap from '../_components/SearchERMap'

interface Props {
  initialKeyword?: string
  initialOption?: 'ALL' | 'NAME' | 'ADDR'
}

export default function SearchMapContainer({ initialKeyword, initialOption }: Props) {
  return (
    <div>
      <SearchERMap initialKeyword={initialKeyword} initialOption={initialOption} />
    </div>
  )
}
