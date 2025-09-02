import React from 'react'
import Contents from '../_global/wrappers/ContentContainer'

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Contents>{children}</Contents>
}
