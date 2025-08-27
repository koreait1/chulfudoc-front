'use client'
import { useEffect, useState, useRef } from 'react'
import Papa from 'papaparse'
import styled from 'styled-components'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

const TableWrap = styled.div`
  min-width: 600px;
  max-width: 1150px;
  padding: 40px 20px;
  margin: 0 auto;
  
  h1 {
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    text-align: center;
  }

  thead {
    background: #f8f8f8;
    border-top: 2px solid #333;
    border-bottom: 1px solid #ccc;
  }

  th,
  td {
    padding: 12px 10px;
    border-bottom: 1px solid #e5e5e5;
  }

  th {
    font-weight: 600;
    color: #333;
  }

  tbody tr:hover {
    background: #fafafa;
  }
`

interface Hospital {
  응급의료기관명: string
  위도: string
  경도: string
  소재지: string
  연락처: string
  distance?: number
}

// Haversine 공식으로 직선 거리 계산
// tmap Api의 하루 호출 제한 횟수 문제가 있어 이를 대처하고자 직선거리로 먼저 20개를 추린 후 tmap Api로 20번 호출만 하여 가까운 병원을 추림
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
  const alertDialog = useAlertDialog();
  const errorRef = useRef(false) // 알람 여러번 방지

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

              await new Promise((r) => setTimeout(r, 200))
            } catch (err) {
              console.error(err)
              if (!errorRef.current) {
                errorRef.current = true
                alertDialog({
                  text: '응급의료기관 거리 계산 중 오류가 발생했습니다. 다시 시도해 주세요.',
                  icon: 'error',
                  callback: () => {
                    errorRef.current = false
                  },
                })
              }
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
  }, [alertDialog])

  return (
    <TableWrap>
      <h1>내 주변 응급의료기관</h1>

      {loading ? (
        <p>거리 계산 중...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>기관명</th>
              <th>소재지</th>
              <th>연락처</th>
              <th>거리</th>
            </tr>
          </thead>
          <tbody>
            {nearestHospitals.map((h, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 'bold' }}>{h.응급의료기관명}</td>
                <td>{h.소재지}</td>
                <td>{h.연락처}</td>
                <td>
                  {h.distance ? (h.distance / 1000).toFixed(2) + ' km' : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TableWrap>
  )
}
