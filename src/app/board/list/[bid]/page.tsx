import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { getBoardConfig } from '../../_services/boardConfig'
import type { BoardConfigType } from '../../_types/BoardType'
import ListContainer from '../../_containers/ListContainer'
export default async function ListPage({ params }) {
  const { bid } = await params
  const board: BoardConfigType = await getBoardConfig(bid)
  return (
    <ContentBox>
      <MainTitle border="true">{board.name}</MainTitle>
      <ListContainer board={board} />
    </ContentBox>
  )
}
