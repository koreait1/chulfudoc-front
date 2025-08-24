'use client'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

declare global {
  interface Window {
    kakao: any
  }
}

interface Hospital {
  응급의료기관명: string
  위도: string
  경도: string
  소재지: string
  연락처: string
}

export default function ERMapTMapV3() {
  const [currentAddress, setCurrentAddress] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=e5b92d42b15969021e6f0020012e0173&autoload=false&libraries=services`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder()

        Papa.parse('/ERPlusPlus.csv', {
          download: true,
          header: true,
          complete: (result) => {
            const data: Hospital[] = result.data
            if (!data.length) return

            navigator.geolocation.getCurrentPosition(
              (p) => {
                const mapContainer = document.getElementById('map')
                const mapOptions = {
                  center: new window.kakao.maps.LatLng(
                    p.coords.latitude,
                    p.coords.longitude,
                  ),
                  level: 7,
                }
                const map = new window.kakao.maps.Map(mapContainer, mapOptions)

                const userPos = new window.kakao.maps.LatLng(
                  p.coords.latitude,
                  p.coords.longitude,
                )

                // 현위치 주소 가져오기
                geocoder.coord2Address(
                  p.coords.longitude,
                  p.coords.latitude,
                  (result: any, status: any) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                      setCurrentAddress(result[0].address.address_name)
                    } else {
                      setCurrentAddress('주소를 가져올 수 없음')
                    }
                  },
                )

                const userMarker = new window.kakao.maps.Marker({
                  map,
                  position: userPos,
                })

                const userInfo = new window.kakao.maps.InfoWindow({
                  content: `<div style="padding:5px;">현위치</div>`,
                })
                userInfo.open(map, userMarker)

                let openInfoWindow: any = null
                let distanceLine: any = null
                let distanceOverlay: any = null

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

                  window.kakao.maps.event.addListener(
                    marker,
                    'click',
                    async () => {
                      if (openInfoWindow) openInfoWindow.close()
                      openInfoWindow = info
                      info.open(map, marker)

                      // 이전 Polyline 제거
                      if (distanceLine) {
                        distanceLine.setMap(null)
                        distanceLine = null
                      }
                      if (distanceOverlay) {
                        distanceOverlay.setMap(null)
                        distanceOverlay = null
                      }

                      // TMap API 호출
                      const tmapRouteUrl =
                        'https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=Zn5hqJeAaN1PnA3ovM8Y03NTGQ0uFQ3X7v1dl01M'
                      const params = {
                        startX: p.coords.longitude,
                        startY: p.coords.latitude,
                        endX: parseFloat(loc.경도),
                        endY: parseFloat(loc.위도),
                        reqCoordType: 'WGS84GEO',
                        resCoordType: 'WGS84GEO',
                        searchOption: 1,
                        trafficInfo: 'Y',
                      }
                      const query = new URLSearchParams(
                        params as any,
                      ).toString()
                      const routeData = await fetch(`${tmapRouteUrl}&${query}`)
                        .then((res) => res.json())
                        .catch(() => null)

                      let distance = 0
                      let duration = 0
                      const pathCoords: any[] = []

                      if (routeData?.features?.length) {
                        distance =
                          routeData.features[0].properties.totalDistance || 0
                        duration =
                          routeData.features[0].properties.totalTime || 0

                        const geometry =
                          routeData.features[0].geometry.coordinates
                        const flatten = (arr: any[]) => {
                          arr.forEach((item) => {
                            if (Array.isArray(item[0])) flatten(item)
                            else
                              pathCoords.push(
                                new window.kakao.maps.LatLng(item[1], item[0]),
                              )
                          })
                        }
                        flatten(geometry)
                      }

                      // Polyline 그리기
                      if (pathCoords.length) {
                        distanceLine = new window.kakao.maps.Polyline({
                          map,
                          path: pathCoords,
                          strokeWeight: 5,
                          strokeColor: '#FF0000',
                          strokeOpacity: 0.7,
                          strokeStyle: 'solid',
                        })
                      }

                      // 거리/시간 CustomOverlay
                      const content = `
                      <ul style="background:white; padding:5px; border-radius:5px; border:1px solid #ccc; position: relative; top: 25px; left: 30px;">
                        <li>총거리 <span class="number">${distance}</span>m</li>
                        <li>예상 소요시간 <span class="number">${Math.ceil(
                          duration / 60,
                        )}</span>분</li>
                      </ul>
                    `
                      distanceOverlay = new window.kakao.maps.CustomOverlay({
                        map,
                        content,
                        position: hospitalPos,
                        xAnchor: 0,
                        yAnchor: 1,
                        zIndex: 3,
                      })
                    },
                  )
                })
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

  return (
    <div>
      <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        현위치: {currentAddress || '위치 가져오는 중...'}
      </p>
      <div id="map" style={{ width: '100%', height: '600px' }} />
    </div>
  )
}
