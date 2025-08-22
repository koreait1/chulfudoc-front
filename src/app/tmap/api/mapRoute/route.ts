import { NextRequest, NextResponse } from 'next/server'

const TMAP_API_KEY = 'Zn5hqJeAaN1PnA3ovM8Y03NTGQ0uFQ3X7v1dl01M'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const startX = searchParams.get('startX')
  const startY = searchParams.get('startY')
  const endX = searchParams.get('endX')
  const endY = searchParams.get('endY')

  if (!startX || !startY || !endX || !endY) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const tmapUrl = `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${TMAP_API_KEY}&startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&searchOption=1&trafficInfo=Y`

  try {
    const res = await fetch(tmapUrl)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Tmap API 요청 실패' },
      { status: 500 },
    )
  }
}
