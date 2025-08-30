'use client'
import { useSearchParams, usePathname } from 'next/navigation'
import useUser from '../hooks/useUser'
import ContentBox from '../components/ContentBox'
import { MainTitle } from '../components/TitleBox'
import LoginContainer from '@/app/member/_containers/LoginContainer'
import { MemberPageWrapper } from '@/app/member/_components/MemberStyleWrapper'

export default function UserOnlyContainer({ children }) {
  const { isLogin } = useUser()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  let qs = searchParams.toString() ?? ''
  qs = qs ? `?${qs}` : qs
  const redirectUrl = `${pathname}${qs}`

  return isLogin ? (
    children
  ) : (
    <ContentBox width={520}>
      <MemberPageWrapper />
      <MainTitle center="true">로그인</MainTitle>
      <LoginContainer redirectUrl={redirectUrl} />
    </ContentBox>
  )
}
