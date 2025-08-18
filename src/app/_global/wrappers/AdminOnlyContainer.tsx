'use client'
import { unauthorized } from 'next/navigation'
import useUser from '../hooks/useUser'

export default function AdminOnlyContainer({ children }) {
  const { isAdmin } = useUser()
  if (!isAdmin) {
    unauthorized()
  }

  return children
}
