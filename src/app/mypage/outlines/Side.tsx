'use client'
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import useUser from "@/app/_global/hooks/useUser";

const MypageSide = styled.div``

const Side = () => {
  const { isLogin } = useUser()

  if (!isLogin) {
    return null
  }
  return (
    <MypageSide>
      <Link href="/mypage/profile">회원정보 수정</Link>
    </MypageSide>
  )
}

export default React.memo(Side)