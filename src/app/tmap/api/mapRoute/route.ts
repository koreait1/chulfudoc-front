import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startX = searchParams.get('startX')
  const startY = searchParams.get('startY')
  const endX = searchParams.get('endX')
  const endY = searchParams.get('endY')

  if (!startX || !startY || !endX || !endY) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const tmapUrl = `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}&startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&searchOption=1&trafficInfo=Y`

  try {
    const res = await fetch(tmapUrl)

    // 429 처리
    if (res.status === 429) {
      return NextResponse.json(
        { error: 'API 호출 제한 초과' },
        { status: 429 },
      )
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `Tmap API 에러: ${res.status}` },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Tmap API 요청 실패' }, { status: 500 })
  }
}
