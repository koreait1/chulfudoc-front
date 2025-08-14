'use client'
import useUser from '../hooks/useUser'
import LoginContainer from '@/app/member/_containers/LoginContainer'
export default function UserOnlyContainer({ children }) {
  const { isLogin } = useUser()

  return isLogin ? children : <LoginContainer />
}
