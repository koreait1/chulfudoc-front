import React from 'react'
import MemberGlobalClient from './MemberGlobalClient'

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return <MemberGlobalClient>{children}</MemberGlobalClient>
}