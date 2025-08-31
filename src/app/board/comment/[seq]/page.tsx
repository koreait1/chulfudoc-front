import { get } from '../../_services/boardData'
import { get as getComment } from '../../_services/comment'
import CommentContainer from '../../_containers/CommentContainer'
import CommonContainer from '../../_wrappers/CommonContainer'
import ContentBox from '@/app/_global/components/ContentBox'
import { MainTitle } from '@/app/_global/components/TitleBox'

export default async function CommentEditPage({
  params,
}: {
  params: Promise<{ seq: number }>
}) {
  const { seq } = await params
  const data = await getComment(seq)
  const boradData = await get(data.boardDataSeq)
  const { board } = boradData
  data.mode = 'comment_update'

  return (
    <CommonContainer board={board} data={data} mode={data.mode}>
      <ContentBox>
        <MainTitle border="ture">댓글 수정</MainTitle>
        <CommentContainer board={board} data={boradData} form={data} />
      </ContentBox>
    </CommonContainer>
  )
}
