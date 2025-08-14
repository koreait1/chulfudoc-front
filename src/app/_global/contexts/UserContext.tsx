'use client'
import React, { createContext, useState } from 'react'

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
<<<<<<< HEAD
  const [isAdmin, setIsAdmin] = useState(
    loggedMember && loggedMember.authority === 'ADMIN',
  )
=======
  const [isAdmin, setIsAdmin] = useState(loggedMember && loggedMember.authority === "ADMIN")
>>>>>>> c774449ed0894211fcec023a14d7c82b8a6a4641

  const value = {
    states: { loggedMember: member, isLogin, isAdmin },
    actions: { setLoggedMember, setIsLogin, setIsAdmin },
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const { Consumer: UserConsumer } = UserContext

export { UserProvider, UserConsumer }

export default UserContext