'use client'
import { useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import { getLoggedMember } from '@/app/member/_services/actions'
export default function useUser() {
  const {
    states: { loggedMember, isLogin, isAdmin, token },
    actions: { setLoggedMember, setIsAdmin, setIsLogin, setToken },
  } = useContext(UserContext)

  useEffect(() => {
    if (!isLogin && token) {
      setToken(token)
    }

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
  }, [isLogin, setIsAdmin, setIsLogin, setLoggedMember, token, setToken])

  return { loggedMember, isLogin, isAdmin, token }
}
