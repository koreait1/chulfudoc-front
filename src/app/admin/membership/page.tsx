import { MainTitle } from "@/app/_global/components/TitleBox";
import AdminOnlyContainer from "@/app/_global/wrappers/AdminOnlyContainer";

export default async function name() {
    return(
        <AdminOnlyContainer>
            <MainTitle border={true} borderThickness={"1px"}>회원 관리</MainTitle>
        </AdminOnlyContainer>
    )
}