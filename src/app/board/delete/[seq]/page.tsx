import { get } from '../../_services/boardData'
import CommonContainer from '../../_wrappers/CommonContainer'
import { redirect } from 'next/navigation'

export default async function DeletePage({
  params,
}: {
  params: Promise<{ seq: number }>
}) {
  const { seq } = await params
  const data = await get(seq)
  const { board } = data
  if (board && data.mine) {
    // 삭제 가능

    // 삭제 처리 후 게시글 목록으로 이동
    redirect(`/board/list/${board.bid}`)

    return
  }

  return (
    <CommonContainer board={board} data={data} mode="delete">
      <></>
    </CommonContainer>
  )
}
