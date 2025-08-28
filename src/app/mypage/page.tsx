import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
import ContentBox from '../_global/components/ContentBox'
import { MainTitle } from '../_global/components/TitleBox'
import Written from './_containers/WrittenListContainer'

export default function Mypage() {
  return (
    <UserOnlyContainer>
      <ContentBox>
        <MainTitle border="true">마이페이지</MainTitle>
        <Written />
      </ContentBox>
    </UserOnlyContainer>
  )
}

// import Image from 'next/image'
// import ContentBox from '../_global/components/ContentBox'
// import FileImages from '../_global/components/FileImages'
// import defaultImg from '../_global/assets/images/noprofile.png'
// import { MainTitle } from '../_global/components/TitleBox'
// import useUser from '../_global/hooks/useUser'
// import UserOnlyContainer from '../_global/wrappers/UserOnlyContainer'
// export default function Mypage() {
//   const { loggedMember } = useUser()
//   return (
//     <UserOnlyContainer>
//       <ContentBox width={0}>
//         <MainTitle>{loggedMember.userName} 님의 마이페이지</MainTitle>
//         <div className="profile">
//           {loggedMember.profileImage ? (
//             <FileImages
//               items={loggedMember.profileImage}
//               viewOnly={true}
//               viewOrgImage={false}
//               width={40}
//               height={40}
//             />
//           ) : (
//             <ul>
//               <li>
//                 <Image src={defaultImg} alt="기본프로필" />
//               </li>
//             </ul>
//           )}
//         </div>
//       </ContentBox>
//     </UserOnlyContainer>
//   )
// }
