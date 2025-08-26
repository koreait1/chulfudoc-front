import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { getBoardConfig } from '../../_services/boardConfig'
import type { BoardConfigType } from '../../_types/BoardType'
import UpdateContainer from '../../_containers/UpdateContainer'

export default async function WritePage({ params }) {
  const { bid } = await params
  const board: BoardConfigType = await getBoardConfig(bid)

  return (
    <ContentBox>
      <MainTitle border="true">{board.name} 글쓰기</MainTitle>
      <UpdateContainer board={board} />
    </ContentBox>
  )
}
