'use client'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import styled from 'styled-components'
import Loading from '@/app/loading'
import LocalLoadingWrapper from '@/app/_global/styles/LocalLoadingWrapper'

const TableWrap = styled.div`
  min-width: 600px;
  max-width: 1150px;
  margin: 20px auto 0; /* 지도와 간격 */
  padding: 20px;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  h1 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    text-align: center;
  }

  thead {
    background: #f8f9fa;
    border-top: 2px solid #333;
    border-bottom: 1px solid #ddd;
  }

  th,
  td {
    padding: 14px 10px;
    border-bottom: 1px solid #eee;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    border-right: 1px solid #f1f3f5;
  }

  th:last-of-type,
  td:last-of-type {
    border-right: none;
  }

  th {
    font-weight: 600;
    color: #333;
  }

  tbody tr:hover {
    background: #f9fafb;
  }

  /* 열 비율 */
  th:nth-of-type(1),
  td:nth-of-type(1) {
    width: 8%; /* 순위 */
    font-weight: bold;
    color: #444;
  }

  th:nth-of-type(2),
  td:nth-of-type(2) {
    width: 27%; /* 기관명 */
    font-weight: bold;
  }

  th:nth-of-type(3),
  td:nth-of-type(3) {
    width: 35%; /* 소재지 */
  }

  th:nth-of-type(4) {
    width: 15%; /* 연락처 */
    font-weight: 500;
  }

  td:nth-of-type(4) {
    width: 15%; /* 연락처 */
    font-weight: 500;
  }

  th:nth-of-type(5),
  td:nth-of-type(5) {
    width: 15%; /* 거리 */
    font-weight: 500;
    color: #555;
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
    <TableWrap>
      <h1>내 주변 응급의료기관</h1>

      {loading ? (
        <LocalLoadingWrapper width="80%" height="400px">
          <Loading text="거리 계산 중" />
        </LocalLoadingWrapper>
      ) : (
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>기관명</th>
              <th>소재지</th>
              <th>거리</th>
              <th>연락처</th>
            </tr>
          </thead>
          <tbody>
            {nearestHospitals.map((h, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 'bold' }}>{h.응급의료기관명}</td>
                <td>{h.소재지}</td>
                <td>
                  {h.distance ? (h.distance / 1000).toFixed(2) + ' km' : '-'}
                </td>
                <td>{h.연락처}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </TableWrap>
  )
}
