'use client'
import { useEffect } from 'react'
import Papa from 'papaparse'
import axios from 'axios'

export default function ERMapTMapV3() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const script = document.createElement('script')
    script.src =
      'https://apis.openapi.sk.com/tmap/vectorjs?version=1&format=javascript&appKey=Zn5hqJeAaN1PnA3ovM8Y03NTGQ0uFQ3X7v1dl01M'
    script.async = true

    script.onload = () => {
      if (!window.Tmapv3 || !window.Tmapv3.LatLng) {
        console.error('Tmapv3 혹은 LatLng 로드 실패')
        return
      }

      Papa.parse('/ERPlusPlus.csv', {
        download: true,
        header: true,
        complete: (result) => {
          const data = result.data
          if (!data.length) return

          navigator.geolocation.getCurrentPosition(async (p) => {
            const userPos = new window.Tmapv3.LatLng(
              p.coords.latitude,
              p.coords.longitude,
            )

            const map = new window.Tmapv3.Map('map', {
              center: userPos,
              width: '100%',
              height: '600px',
              zoom: 10,
            })

            // 내 위치 마커
            new window.Tmapv3.Marker({
              position: userPos,
              map,
              title: '현위치',
            })

            let openInfoWindow = null
            let openPolyline = null

            for (const loc of data) {
              if (!loc.위도 || !loc.경도) continue

              const hospitalPos = new window.Tmapv3.LatLng(
                parseFloat(loc.위도),
                parseFloat(loc.경도),
              )

              const marker = new window.Tmapv3.Marker({
                position: hospitalPos,
                map,
                title: loc.응급의료기관명,
              })

              const infoWindow = new window.Tmapv3.InfoWindow({
                position: hospitalPos,
                content: `<div style="padding:5px; min-width:200px;">
                            <b>${loc.응급의료기관명}</b><br>
                            ${loc['소재지'] || '주소 없음'}<br>
                            ${loc['연락처'] || '연락처 없음'}<br>
                            거리/시간 계산 중...
                          </div>`,
              })

              marker.addListener('click', async () => {
                if (openInfoWindow) openInfoWindow.close()
                if (openPolyline) openPolyline.setMap(null)

                infoWindow.open(map)
                openInfoWindow = infoWindow

                const apiKey = 'OgU5FAQ1KK7bWt4fvIGT96FZD0HiLCib53vsayaB'
                const url =
                  'https://apis.openapi.sk.com/tmap/routes?version=1&format=json'

                const modes = ['CAR', 'PEDESTRIAN', 'BICYCLE']
                let routeInfoHtml = ''

                for (const mode of modes) {
                  try {
                    const params = {
                      startX: p.coords.longitude,
                      startY: p.coords.latitude,
                      endX: loc.경도,
                      endY: loc.위도,
                      reqCoordType: 'WGS84GEO',
                      resCoordType: 'WGS84GEO',
                      searchOption: 0,
                      trafficInfo: 'Y',
                      searchType: mode,
                    }

                    const response = await axios.post(url, params, {
                      headers: { appKey: apiKey },
                    })

                    const routeFeatures = response.data.features
                    if (!routeFeatures || !routeFeatures.length) {
                      routeInfoHtml += `<b>${mode}</b>: 경로 없음<br>`
                      continue
                    }

                    const routeProps = routeFeatures[0].properties
                    const lineCoords =
                      routeFeatures[0].geometry.coordinates.map(
                        ([lon, lat]) => new window.Tmapv3.LatLng(lat, lon),
                      )

                    if (mode === 'CAR') {
                      openPolyline = new window.Tmapv3.Polyline({
                        map,
                        path: lineCoords,
                        strokeColor: '#db4040',
                        strokeWeight: 3,
                        strokeOpacity: 0.8,
                        strokeStyle: 'solid',
                      })
                    }

                    routeInfoHtml += `<b>${mode}</b>: ${Math.round(
                      routeProps.totalDistance,
                    )}m / ${Math.round(routeProps.totalTime / 60)}분<br>`
                  } catch (err) {
                    routeInfoHtml += `<b>${mode}</b>: 거리 X<br>`
                  }
                }

                infoWindow.setContent(`<div style="padding:5px; min-width:200px;">
                      <b>${loc.응급의료기관명}</b><br>
                      ${loc['소재지'] || '주소 없음'}<br>
                      ${loc['연락처'] || '연락처 없음'}<br>
                      ${routeInfoHtml}
                    </div>`)
              })
            }
          })
        },
      })
    }

    document.head.appendChild(script)
  }, [])

  return <div id="map" style={{ width: '100%', height: '600px' }} />
}