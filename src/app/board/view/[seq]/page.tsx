import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'
import { get } from '../../_services/boardData'
import ViewContainer from '../../_containers/ViewContainer'

export default async function ViewPage({
  params,
}: {
  params: Promise<{ seq: number }>
}) {
  const { seq } = await params
  const data = await get(seq)
  const { board } = data
  data.mode = 'view'

  return (
    <ContentBox>
      {data?.subject && <MainTitle border="true">{data?.subject}</MainTitle>}
      <ViewContainer board={board} data={data} />
    </ContentBox>
  )
}
