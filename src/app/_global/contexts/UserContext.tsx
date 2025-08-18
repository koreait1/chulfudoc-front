'use client'
import React, { createContext, useState } from 'react'

type UserContextType = {
  states: any
  actions: any
}

const UserContext = createContext<UserContextType>({
  states: {
    loggedMember: undefined,
    isLogin: false,
    isAdmin: false,
    token: null,
  },
  actions: {
    setLoggedMember: undefined,
    setIsLogin: undefined,
    setIsAdmin: undefined,
    setToken: undefined,
  },
})

function UserProvider({ children, loggedMember, token }) {
  const [member, setLoggedMember] = useState(loggedMember)
  const [isLogin, setIsLogin] = useState(Boolean(loggedMember))
  const [isAdmin, setIsAdmin] = useState(
    loggedMember && loggedMember.authority === 'ADMIN',
  )

  const [_token, setToken] = useState(token)
  const value = {
    states: { loggedMember: member, isLogin, isAdmin, token: _token },
    actions: { setLoggedMember, setIsLogin, setIsAdmin, setToken },
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const { Consumer: UserConsumer } = UserContext

export { UserProvider, UserConsumer }

export default UserContext
