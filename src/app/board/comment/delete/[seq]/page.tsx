import { get } from '../../../_services/boardData'
import { get as getComment, deleteComment } from '../../../_services/comment'
import CommonContainer from '../../../_wrappers/CommonContainer'
import { redirect } from 'next/navigation'
import { getLoggedMember } from '@/app/member/_services/actions'

export default async function CommentDeletePage({
  params,
}: {
  params: Promise<{ seq: number }>
}) {
  const { seq } = await params
  const data = await getComment(seq)
  const boardData = await get(data.boardDataSeq)
  const { board } = boardData

  const member = await getLoggedMember()

  if (board && (data.mine || (member && member.authority === 'ADMIN'))) {
    // 삭제 가능
    await deleteComment(seq) // 삭제 처리

    // 삭제 처리 후 게시글 목록으로 이동
    redirect(`/board/view/${data.boardDataSeq}`)
  }

  return (
    <CommonContainer board={board} data={data} mode="comment_delete">
      <></>
    </CommonContainer>
  )
}
