import { fetchSSR } from '@/app/_global/libs/utils'

export async function checkGuest(mode: string, seq: number): Promise<boolean> {
  const res = await fetchSSR(`/board/guest/${mode}/${seq}`)

  return res.status === 200
}
