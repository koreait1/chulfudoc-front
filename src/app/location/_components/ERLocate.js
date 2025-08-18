'use client'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

export default function ERLocate() {
  const [nearestList, setNearestList] = useState([])

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

                const hospitals = []

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

                  hospitals.push({
                    name: (loc['응급의료기관명'] || '이름 없음').trim(),
                    address: (loc['소재지'] || '주소 없음').trim(),
                    phone: (loc['연락처'] || '연락처 없음').trim(),
                    distance: Math.round(distance),
                  })
                })

                const nearestFive = hospitals
                  .sort((a, b) => a.distance - b.distance)
                  .slice(0, 5)

                setNearestList(nearestFive)
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

  if (!nearestList.length) return null

  return (
    <div>
      <h2>가장 가까운 병원 5곳</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {nearestList.map((h, idx) => (
          <li key={idx}>
            <p>
              <b>
                {idx + 1}. {h.name}
              </b>
            </p>
            <p>
              <b>주소:</b> {h.address}
            </p>
            <p>
              <b>연락처:</b> {h.phone}
            </p>
            <p>
              <b>거리:</b> {h.distance}m
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}