'use client'
import { useEffect } from 'react'
import Papa from 'papaparse'

export default function ERMap() {
  useEffect(() => {
    // Kakao 지도 API 스크립트 생성
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=e5b92d42b15969021e6f0020012e0173&autoload=false`
    script.async = true

    script.onload = () => {
      // SDK가 준비되면 autoload로 init 호출
      window.kakao.maps.load(() => {
        // CSV 데이터 로드 후 지도 초기화
        Papa.parse('/ERPlusPlus.csv', {
          download: true,
          header: true,
          complete: (result) => {
            const data = result.data
            if (!data.length) return

            const container = document.getElementById('map')
            const options = {
              center: new window.kakao.maps.LatLng(
                parseFloat(data[0].위도),
                parseFloat(data[0].경도),
              ),
              level: 7,
            }

            const map = new window.kakao.maps.Map(container, options)

            data.forEach((loc) => {
              if (!loc.위도 || !loc.경도) return

              const marker = new window.kakao.maps.Marker({
                map,
                position: new window.kakao.maps.LatLng(
                  parseFloat(loc.위도),
                  parseFloat(loc.경도),
                ),
              })

              const address = loc['소재지']?.trim() || '주소 없음'
              const phone = loc['연락처']?.trim() || '연락처 없음'

              const info = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px; min-width:200px; max-width:300px; word-wrap:break-word;">
              <b>${loc.응급의료기관명}</b><br>
              ${address}, ${phone}<br>
            </div>`,
              })

              let isOpen = false
              window.kakao.maps.event.addListener(marker, 'click', () => {
                if (isOpen) {
                  info.close()
                  isOpen = false
                } else {
                  info.open(map, marker)
                  isOpen = true
                }
              })
            })
          },
        })
      })
    }

    document.head.appendChild(script)
  }, [])

  return <div id="map" style={{ width: '100%', height: '600px' }} />
}
