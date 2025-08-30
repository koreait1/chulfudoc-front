import { get } from '../../_services/boardData'
import CommonContainer from '../../_wrappers/CommonContainer'
import { redirect } from 'next/navigation'
import { getLoggedMember } from '@/app/member/_services/actions'
import { deleteData } from '../../_services/boardDelete'

export default async function DeletePage({
  params,
}: {
  params: Promise<{ seq: number }>
}) {
  const { seq } = await params
  const data = await get(seq)
  const { board } = data

  const member = await getLoggedMember()

  if (board && (data.mine || (member && member.authority === 'ADMIN'))) {
    // 삭제 가능
    await deleteData(seq) // 삭제 처리

    // 삭제 처리 후 게시글 목록으로 이동
    redirect(`/board/list/${board.bid}`)
  }

  return (
    <CommonContainer board={board} data={data} mode="delete">
      <></>
    </CommonContainer>
  )
}
