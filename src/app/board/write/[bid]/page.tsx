import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { getBoardConfig } from '../../_services/boardConfig'
import type { BoardConfigType, BoardDataType } from '../../_types/BoardType'
import UpdateContainer from '../../_containers/UpdateContainer'
import { get } from '../../_services/boardData'
import Header from '@/app/_global/outlines/Header'

const HEADER_HEIGHT = 80
function HeaderSpacer() {
  return <div style={{ height: `${HEADER_HEIGHT}px` }} />
}

export default async function WritePage({ params }) {
  const { bid } = await params
  const board: BoardConfigType = await getBoardConfig(bid)
  const data: BoardDataType = await get()
  data.bid = bid

  return (
    <ContentBox>
      <Header />
      <HeaderSpacer />

      <MainTitle className="write-title" border="true">
        {board.name} 글쓰기
      </MainTitle>
      <UpdateContainer board={board} data={data} />
    </ContentBox>
  )
}
