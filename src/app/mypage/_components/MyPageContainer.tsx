"use client";

import UserOnlyContainer from "../../_global/wrappers/UserOnlyContainer";
import ContentBox from "../../_global/components/ContentBox";
import { MainTitle } from "../../_global/components/TitleBox";
import WrittenListContainer from "../_containers/WrittenListContainer";
import { Button } from "../../_global/components/Buttons";
import DeleteButton from "../_components/DeleteButton";

export default function MyPageContainer() {
  return (
    <UserOnlyContainer>
      <ContentBox>
        <MainTitle border="true">마이페이지</MainTitle>

        <a href="/mypage/profile">
          <Button>회원정보 수정</Button>
        </a>

        <DeleteButton />

        <WrittenListContainer />
      </ContentBox>
    </UserOnlyContainer>
  );
}
