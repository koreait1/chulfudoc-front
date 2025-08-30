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
const { small } = fontSize
const MyInfo = styled.table`
  padding: 50px 10px;
  min-width: 320px;
  max-width: 1150px;
  margin: 0 auto;
  width: 100%;
  .profile {
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .info {
    th,
    td {
      span {
        display: block;
        font-size: ${small};
        color: ${dark};
      }
    }
  }
  th,
  td {
    padding: 10px 15px;
    vertical-align: middle;
  }
  th {
    text-align: right;
    width: 150px;
  }
  tr:last-child {
    td {
      padding: 10px 15px;
      text-align: right;
    }
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
              width={40}
              height={40}
            />
          </th>
          <td>
            <span>{loggedMember.name} 님</span>
          </td>
        </tr>
        <tr className="info">
          <th>
            <span>이메일</span>
            <span>휴대전화 번호</span>
            <span>회원가입 일자</span>
          </th>
          <td>
            <span>{loggedMember.email}</span>
            <span>{loggedMember.mobile}</span>
            <span>{loggedMember.createdAt}</span>
          </td>
        </tr>
        <tr>
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
