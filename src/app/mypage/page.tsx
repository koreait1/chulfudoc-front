import Image from 'next/image'
import ContentBox from '../_global/components/ContentBox'
import FileImages from '../_global/components/FileImages'
import noprofile from '../_global/assets/images/noprofile.png'
import { MainTitle } from '../_global/components/TitleBox'
import useUser from '../_global/hooks/useUser'
import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
export default function Mypage() {
  const { loggedMember } = useUser()
  return (
    <UserOnlyContainer>
      <ContentBox width={0}>
        <MainTitle>{loggedMember.userName} 님의 마이페이지</MainTitle>
        <div className="profile">
            <FileImages
              items={loggedMember.profileImage}
              fallbackImage={noprofile}
              viewOnly={true}
              viewOrgImage={false}
              width={40}
              height={40}
            />
        </div>
      </ContentBox>
    </UserOnlyContainer>
  )
}
