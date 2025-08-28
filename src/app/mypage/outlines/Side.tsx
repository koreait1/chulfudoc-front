'use client'
import React from "react";
import styled from "styled-components";
import Link from "next/link";

const MypageSide = styled.div``

const Side = () => {
  return (
    <MypageSide>
      <Link href="/mypage/profile">회원정보 수정</Link>
    </MypageSide>
  )
}

export default React.memo(Side)