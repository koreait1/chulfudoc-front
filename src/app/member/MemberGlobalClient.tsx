'use client'

import React from 'react'
import { MemberPageWrapper } from './_components/MemberStyleWrapper'

export default function MemberGlobalClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MemberPageWrapper />
      {children}
    </>
  )
}
