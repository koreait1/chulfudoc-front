'use client'
import { unauthorized, forbidden } from 'next/navigation'
import useUser from '../hooks/useUser'

export default function AdminOnlyContainer({ children }) {
  const { isAdmin, isLogin } = useUser()

  if (!isLogin) {
    unauthorized()
  }

  if (!isAdmin) {
    forbidden()
  }

  return children
}
