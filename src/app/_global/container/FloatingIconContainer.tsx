import React, {useCallback} from "react"
import FloatingIcon from "../components/FloatingIcon";
import { GoMoveToTop } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { LuClipboardPenLine } from "react-icons/lu";
import { useRouter } from "next/navigation";

const enum PageLink{
    MYPAGE = '/mypage',
    BOARD = '/board'
}

const FloatingIconContainer = () => {
    const router = useRouter();

    const goTop = useCallback(() => {
            window.scrollTo({
            top: 0,           
            behavior: "smooth",
            });
        }, []);

    const goToPage = (page: PageLink) => {
        router.push(page)
    }

    return (
        <>
            <FloatingIcon bottom={30} onClick={goTop}>
                <GoMoveToTop style={{ width: '25px', height: 'auto' }} />
            </FloatingIcon>
            <FloatingIcon bottom={100} background="#4D96FF" onClick={() =>goToPage(PageLink.MYPAGE)}>
                <CgProfile style={{ width: '25px', height: 'auto' }} />
            </FloatingIcon>
            <FloatingIcon bottom={170} background="#6BCB77" onClick={() =>goToPage(PageLink.BOARD)}>
                <LuClipboardPenLine style={{ width: '25px', height: 'auto' }} />
            </FloatingIcon>
        </>
    )
}

export default React.memo(FloatingIconContainer)