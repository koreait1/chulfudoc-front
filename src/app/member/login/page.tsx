import LoginContainer from '../_containers/LoginContainer'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default function LoginPage() {
  return (
    <ContentBox width={420}>
      <MainTitle center="true">로그인</MainTitle>
      <LoginContainer redirectUrl="" />
    </ContentBox>
  )
}
