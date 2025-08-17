'use client'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

export default function ERLocate() {
  const [nearest, setNearest] = useState(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=e5b92d42b15969021e6f0020012e0173&autoload=false'
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(() => {
        Papa.parse('/ERPlusPlus.csv', {
          download: true,
          header: true,
          complete: (result) => {
            const data = result.data
            if (!data.length) return

            navigator.geolocation.getCurrentPosition(
              (p) => {
                const userPos = new window.kakao.maps.LatLng(
                  p.coords.latitude,
                  p.coords.longitude,
                )

                let nearestHospital = null
                let minDistance = Infinity

                data.forEach((loc) => {
                  if (!loc.위도 || !loc.경도) return

                  const hospitalPos = new window.kakao.maps.LatLng(
                    parseFloat(loc.위도),
                    parseFloat(loc.경도),
                  )

                  const polyline = new window.kakao.maps.Polyline({
                    path: [userPos, hospitalPos],
                  })
                  const distance = polyline.getLength()

                  if (distance < minDistance) {
                    minDistance = distance
                    nearestHospital = {
                      name: loc['응급의료기관명']?.trim() || '이름 없음',
                      address: loc['소재지']?.trim() || '주소 없음',
                      phone: loc['연락처']?.trim() || '연락처 없음',
                      distance: Math.round(distance),
                    }
                  }
                })

                if (nearestHospital) {
                  setNearest(nearestHospital)
                }
              },
              (err) => {
                console.error('위치를 가져올 수 없습니다.', err)
              },
            )
          },
        })
      })
    }

    document.head.appendChild(script)
  }, [])

  if (!nearest) return <p>가장 가까운 병원을 찾는 중...</p>

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px' }}>
      <h2 style={{ fontWeight: 'bold', marginBottom: '8px' }}>가장 가까운 병원</h2>
      <p><b>이름:</b> {nearest.name}</p>
      <p><b>주소:</b> {nearest.address}</p>
      <p><b>연락처:</b> {nearest.phone}</p>
      <p><b>거리:</b> {nearest.distance}m</p>
    </div>
  )
}