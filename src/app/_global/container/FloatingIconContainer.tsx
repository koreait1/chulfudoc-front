import React, { useState, useEffect } from 'react'
import FloatingIcon from '../components/FloatingIcon'
import { GoMoveToTop } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'
import { LuClipboardPenLine } from 'react-icons/lu'
import { useRouter } from 'next/navigation'

type FloatingType = {
  section: number
  goTop: () => void
}

const enum PageLink {
  MYPAGE = '/mypage',
  BOARD = '/board/list/freetalk',
}

const FloatingIconContainer = ({ section, goTop }: FloatingType) => {
  const router = useRouter()
  const [visible, setIsVisible] = useState('false')

  const goToPage = (page: PageLink) => {
    router.push(page)
  }

  useEffect(() => {
    const handleScroll = () => {
      const data = section > 0
      setIsVisible(String(data))
    }

    handleScroll()
  }, [section])

  return (
    <>
      <FloatingIcon bottom={30} visible={visible} onClick={goTop}>
        <GoMoveToTop style={{ width: '25px', height: 'auto' }} />
      </FloatingIcon>
      <FloatingIcon
        bottom={100}
        background="#4D96FF"
        visible={visible}
        onClick={() => goToPage(PageLink.MYPAGE)}
      >
        <CgProfile style={{ width: '25px', height: 'auto' }} />
      </FloatingIcon>
      <FloatingIcon
        bottom={170}
        background="#6BCB77"
        visible={visible}
        onClick={() => goToPage(PageLink.BOARD)}
      >
        <LuClipboardPenLine style={{ width: '25px', height: 'auto' }} />
      </FloatingIcon>
    </>
  )
}

export default React.memo(FloatingIconContainer)
