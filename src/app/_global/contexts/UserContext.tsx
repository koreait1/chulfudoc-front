'use client'
import { createContext, useState } from 'react'

type UserContextType = {
  states: any
  actions: any
}

const UserContext = createContext<UserContextType>({
  states: { loggedMember: undefined, isLogin: false, isAdmin: false },
  actions: {
    setLoggedMember: undefined,
    setIsLogin: undefined,
    setIsAdmin: undefined,
  },
})

function UserProvider({ children, loggedMember }) {
  const [member, setLoggedMember] = useState(loggedMember)
  const [isLogin, setIsLogin] = useState(Boolean(loggedMember))
  const [isAdmin, setIsAdmin] = useState(false)
  if (isLogin) {
    setIsAdmin(loggedMember.authority === 'ADMIN')
  }

  const value = {
    states: { loggedMember: member, isLogin, isAdmin },
    actions: { setLoggedMember, setIsLogin, setIsAdmin },
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const { Consumer: UserConsumer } = UserContext

export { UserProvider, UserConsumer }

export default UserContext
