import React, {useCallback, useState, useEffect} from "react"
import FloatingIcon from "../components/FloatingIcon";
import { GoMoveToTop } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { LuClipboardPenLine } from "react-icons/lu";
import { useRouter } from "next/navigation";

const enum PageLink{
    MYPAGE = '/mypage',
    BOARD = '/board'
}

const FloatingIconContainer = ({goTop}) => {
    const router = useRouter();
    const scrollThreshold = 80
    const [visible, setIsVisible] = useState('false')

    

    const goToPage = (page: PageLink) => {
        router.push(page)
    }
    
    useEffect(() => {
        const handleScroll = () => {
            const data = window.scrollY > scrollThreshold
            setIsVisible(String(data))
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [scrollThreshold])

    return (
        <>
            <FloatingIcon bottom={30} visible={visible} onClick={goTop}>
                <GoMoveToTop style={{ width: '25px', height: 'auto' }} />
            </FloatingIcon>
            <FloatingIcon bottom={100} background="#4D96FF" visible={visible} onClick={() =>goToPage(PageLink.MYPAGE)}>
                <CgProfile style={{ width: '25px', height: 'auto' }} />
            </FloatingIcon>
            <FloatingIcon bottom={170} background="#6BCB77" visible={visible} onClick={() =>goToPage(PageLink.BOARD)}>
                <LuClipboardPenLine style={{ width: '25px', height: 'auto' }} />
            </FloatingIcon>
        </>
    )
}

export default React.memo(FloatingIconContainer)