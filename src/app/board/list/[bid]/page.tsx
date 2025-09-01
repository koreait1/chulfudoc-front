import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { getBoardConfig, getBoardList } from '../../_services/boardConfig'
import { getList } from '../../_services/boardData'
import type {
  BoardConfigType,
  BoardSearchType,
  BoardListType,
} from '../../_types/BoardType'
import ListContainer from '../../_containers/ListContainer'
import Header from '@/app/_global/outlines/Header'
import BoardTabs from '../../_components/BoardTabs'

export default async function ListPage({
  params,
  searchParams,
}: {
  params: Promise<{ bid: string }>
  searchParams: Promise<BoardSearchType>
}) {
  const { bid } = await params
  const board: BoardConfigType = await getBoardConfig(bid)
  const search = await searchParams

  const { items: boards = [] } = await getBoardList({
    page: 1,
    size: 999,
    active: true,
  } as any)

  const { items, pagination } = await getList(bid, search)

  return (
    <ContentBox>
      <MainTitle border="true">{board.name}</MainTitle>

      <BoardTabs boards={boards} activeBid={bid} />

      <ListContainer
        board={board}
        items={items}
        pagination={pagination}
        search={search}
      />
    </ContentBox>
  )
}
