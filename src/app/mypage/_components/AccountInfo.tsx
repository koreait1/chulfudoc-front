'use client'
import FileImages from '@/app/_global/components/FileImages'
import useUser from '@/app/_global/hooks/useUser'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'
import React from 'react'
import styled from 'styled-components'
import noprofile from '@/app/_global/assets/images/noprofile.png'
import { Button } from '@/app/_global/components/Buttons'
const { dark } = color
const { small, big, extra } = fontSize
const MyInfo = styled.table`
  display: block;
  padding: 50px 10px;
  min-width: 320px;
  max-width: 1150px;
  margin: 0 auto;
  width: 80%;
  border-bottom:1px solid #00000055;
  *{padding:0;}
  tbody, tr{
    width:100%;
    display: block;
  }
  .profile {
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
    p:first-child{
      font-size:${extra};
      margin:0;
    }
    p:last-child{
      font-size:${big};
    }
    th{
      width:70%;
      padding: 0 10% 15px 20%;
    }
    td{ 
      width:100%;
    }
  }
  .info {
      display:flex;
    th,
    td {
      p {
        display: block;
        color: ${dark};
        padding:10px 0 0;
        border-top:1px solid #00000015;
      }
      p:last-child {
        padding-bottom:10px;
        border-bottom:1px solid #00000015;
      }
    }
    th{
      width:30%;
    }
    td {
      width:69%;  
    }
  }
  .button{
  
    th,
    td,
    button{
      margin: 0 auto;
      display:block;
    }
    button{margin-top:10px;}
  }
`
const UserInfo = () => {
  const { loggedMember } = useUser()
  return (
    <MyInfo>
      <tbody>
        <tr className="profile">
          <th>
            <FileImages
              items={loggedMember.profileImage}
              viewOnly={true}
              fallbackImage={noprofile}
              viewOrgImage={false}
              width={200}
              height={200}
            />
          </th>
          <td>
            <p>{loggedMember.name} 님</p>
            <p>사용자 ID: {loggedMember.userId}</p>
          </td>
        </tr>
        <tr className="info">
          <th>
            <p>이메일</p>
            <p>휴대전화 번호</p>
            <p>회원가입 일자</p>
          </th>
          <td>
            <p>{loggedMember.email}</p>
            <p>{loggedMember.mobile}</p>
            <p>{loggedMember.createdAt}</p>
          </td>
        </tr>
        <tr className='button'>
          <td>
            <a href="/mypage/profile">
              <Button>회원정보 수정</Button>
            </a>
          </td>
        </tr>
      </tbody>
    </MyInfo>
  )
}

export default React.memo(UserInfo)
