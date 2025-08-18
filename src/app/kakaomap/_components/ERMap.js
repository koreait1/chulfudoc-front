'use client'
import { useEffect } from 'react'
import Papa from 'papaparse'

export default function ERMap() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=e5b92d42b15969021e6f0020012e0173&autoload=false`
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

                const container = document.getElementById('map')
                const options = {
                  center: new window.kakao.maps.LatLng(
                    p.coords.latitude,
                    p.coords.longitude,
                  ),
                  level: 7,
                }
                const map = new window.kakao.maps.Map(container, options)

                const userPos = new window.kakao.maps.LatLng(
                  p.coords.latitude,
                  p.coords.longitude,
                )

                const userMarker = new window.kakao.maps.Marker({
                  map,
                  position: userPos,
                })

                const userInfo = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;">현위치</div>`,
                })
                userInfo.open(map, userMarker)

                let distanceLine = null
                let distanceOverlay = null
                let openInfoWindow = null // 현재 열려 있는 InfoWindow 추적

                data.forEach((loc) => {
                  if (!loc.위도 || !loc.경도) return

                  const hospitalPos = new window.kakao.maps.LatLng(
                    parseFloat(loc.위도),
                    parseFloat(loc.경도),
                  )

                  const marker = new window.kakao.maps.Marker({
                    map,
                    position: hospitalPos,
                  })

                  const address = loc['소재지']?.trim() || '주소 없음'
                  const phone = loc['연락처']?.trim() || '연락처 없음'

                  const info = new window.kakao.maps.InfoWindow({
                    content: `<div style="padding:5px; min-width:200px; max-width:300px; height: 85px;">
                      <b>${loc.응급의료기관명}</b><br>
                      <div>${address}<br>${phone}</div>
                    </div>`,
                  })

                  window.kakao.maps.event.addListener(marker, 'click', () => {
                    // 이미 같은 InfoWindow가 열려있으면 닫기
                    if (openInfoWindow === info) {
                      info.close()
                      openInfoWindow = null

                      // 선, 거리 오버레이 제거
                      if (distanceLine) {
                        distanceLine.setMap(null)
                        distanceLine = null
                      }
                      if (distanceOverlay) {
                        distanceOverlay.setMap(null)
                        distanceOverlay = null
                      }
                      return
                    }

                    // 기존 InfoWindow 닫기
                    if (openInfoWindow) {
                      openInfoWindow.close()
                    }
                    openInfoWindow = info

                    info.open(map, marker)

                    if (distanceLine) {
                      distanceLine.setMap(null)
                      distanceLine = null
                    }
                    if (distanceOverlay) {
                      distanceOverlay.setMap(null)
                      distanceOverlay = null
                    }

                    distanceLine = new window.kakao.maps.Polyline({
                      map,
                      path: [userPos, hospitalPos],
                      strokeWeight: 3,
                      strokeColor: '#db4040',
                      strokeOpacity: 1,
                      strokeStyle: 'solid',
                    })

                    const distance = Math.round(distanceLine.getLength())
                    const content = getDistanceHTML(distance)

                    distanceOverlay = new window.kakao.maps.CustomOverlay({
                      map,
                      content,
                      position: hospitalPos,
                      xAnchor: 0,
                      yAnchor: 1,
                      zIndex: 3,
                    })
                  })
                })

                function getDistanceHTML(distance) {
                  const walkTime = Math.floor(distance / 50)
                  const walkHour =
                    walkTime >= 60
                      ? `<span class="number">${Math.floor(
                          walkTime / 60,
                        )}</span>시간 `
                      : ''
                  const walkMin = `<span class="number">${
                    walkTime % 60
                  }</span>분`

                  const bicycleTime = Math.floor(distance / 150)
                  const bicycleHour =
                    bicycleTime >= 60
                      ? `<span class="number">${Math.floor(
                          bicycleTime / 60,
                        )}</span>시간 `
                      : ''
                  const bicycleMin = `<span class="number">${
                    bicycleTime % 60
                  }</span>분`

                  return `
                    <ul style="background:white; padding:5px; border-radius:5px; border:1px solid #ccc; position: relative; top: 25px; left: 30px;">
                      <li>총거리 <span class="number">${distance}</span>m</li>
                      <li>도보 ${walkHour}${walkMin}</li>
                      <li>자전거 ${bicycleHour}${bicycleMin}</li>
                    </ul>
                  `
                }
              },
              (err) => {
                alert('현재 위치를 가져올 수 없습니다.')
                console.error(err)
              },
            )
          },
        })
      })
    }

    document.head.appendChild(script)
  }, [])

  return <div id="map" style={{ width: '100%', height: '600px' }} />
}
