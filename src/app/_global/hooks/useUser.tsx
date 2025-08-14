'use client'
import { useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import { getLoggedMember } from '@/app/member/_services/actions'
export default function useUser() {
  const {
    states: { loggedMember, isLogin, isAdmin },
    actions: { setLoggedMember, setIsAdmin, setIsLogin },
  } = useContext(UserContext)

  useEffect(() => {
    if (!isLogin) {
      ;(async () => {
        const member = await getLoggedMember()
        if (member) {
          setLoggedMember(member)
          setIsLogin(true)
          setIsAdmin(member.authority === 'ADMIN')
        }
      })()
    }
  }, [isLogin, setIsAdmin, setIsLogin, setLoggedMember])

  return { loggedMember, isLogin, isAdmin }
}
