'use client'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

interface Hospital {
  응급의료기관명: string
  위도: string
  경도: string
  소재지: string
  연락처: string
  distance?: number
}

// Haversine 공식으로 직선 거리 계산 (m)
function calcDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3 // 지구 반지름 (m)
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const p1 = toRad(lat1)
  const p2 = toRad(lat2)
  const latInterval = toRad(lat2 - lat1)
  const lonInterval = toRad(lon2 - lon1)

  const a =
    Math.sin(latInterval / 2) ** 2 +
    Math.cos(p1) * Math.cos(p2) * Math.sin(lonInterval / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function NearERInfo() {
  const [nearestHospitals, setNearestHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Papa.parse('/ERPlusPlus.csv', {
      download: true,
      header: true,
      complete: async (result) => {
        const data: Hospital[] = result.data.filter(
          (loc: Hospital) => loc.위도 && loc.경도,
        )
        if (!data.length) return

        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords
          setLoading(true)

          // 직선 거리 가까운 후보 20개만 선택
          const candidates = data
            .map((loc) => ({
              ...loc,
              straightDistance: calcDistance(
                latitude,
                longitude,
                parseFloat(loc.위도),
                parseFloat(loc.경도),
              ),
            }))
            .sort((a, b) => a.straightDistance - b.straightDistance)
            .slice(0, 20) // 후보 20개만 특정

          const hospitalsWithDistance: Hospital[] = []

          for (const loc of candidates) {
            try {
              const res = await fetch(
                `/tmap/api/mapRoute?startX=${longitude}&startY=${latitude}&endX=${parseFloat(
                  loc.경도,
                )}&endY=${parseFloat(loc.위도)}`,
              )
              const routeData = await res.json()
              const distance =
                routeData?.features?.[0]?.properties?.totalDistance ?? 0
              hospitalsWithDistance.push({ ...loc, distance })

              // 텀 주기
              await new Promise((r) => setTimeout(r, 200))
            } catch (err) {
              console.error(err)
            }
          }

          // 실제 거리 기준 상위 5개
          const nearest5 = hospitalsWithDistance
            .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
            .slice(0, 5)

          setNearestHospitals(nearest5)
          setLoading(false)
        })
      },
    })
  }, [])

  return (
    <div>
      <h2>실제 도로 기준 내 위치에서 가장 가까운 병원 5곳</h2>
      {loading && <p>거리 계산 중...</p>}
      <ul>
        {nearestHospitals.map((h, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            <b>{h.응급의료기관명}</b> <br />
            {h.소재지} <br />
            {h.연락처} <br />
            거리: {h.distance ?? 0} m
          </li>
        ))}
      </ul>
    </div>
  )
}
