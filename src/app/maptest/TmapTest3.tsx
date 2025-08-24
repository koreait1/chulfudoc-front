'use client'
import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'

interface Hospital {
  응급의료기관명: string
  위도: string
  경도: string
  소재지: string
  연락처: string
}

declare global {
  interface Window {
    Tmapv3: any
  }
}

export default function TmapTest3() {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Tmapv3) {
        clearInterval(interval)
        initMap(window.Tmapv3)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const initMap = (Tmapv3: any) => {
    Papa.parse('/ERPlusPlus.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const hospitals: Hospital[] = result.data
        if (!hospitals.length) return

        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const map = new Tmapv3.Map('map3', {
              center: new Tmapv3.LatLng(pos.coords.latitude, pos.coords.longitude),
              width: '100%',
              height: '600px',
              zoom: 14,
            })

            // 현위치 마커 + InfoWindow
            const userPos = new Tmapv3.LatLng(pos.coords.latitude, pos.coords.longitude)
            const userMarker = new Tmapv3.Marker({
              map,
              position: userPos,
              title: '현위치',
            })

            const userInfoWindow = new Tmapv3.InfoWindow({
              position: userPos,
              content: `<div style="padding:5px; min-width:150px;">
                <b>현 위치</b><br>
                위도: ${pos.coords.latitude}<br>
                경도: ${pos.coords.longitude}
              </div>`,
              type: 2,
              map: map
            })

            userMarker.addListener('click', () => {
              userInfoWindow.open(map)
            })

            // 병원 거리 계산
            const distances = hospitals
              .filter(h => h.위도 && h.경도)
              .map(h => {
                const lat = parseFloat(h.위도)
                const lng = parseFloat(h.경도)
                const dLat = lat - pos.coords.latitude
                const dLng = lng - pos.coords.longitude
                const dist = Math.sqrt(dLat * dLat + dLng * dLng)
                return { hospital: h, dist }
              })

            const nearestFive = distances.sort((a, b) => a.dist - b.dist).slice(0, 5)
            let distanceLines: any[] = []

            // 모든 병원 마커 표시
            hospitals.forEach(h => {
              if (!h.위도 || !h.경도) return
              const hospitalPos = new Tmapv3.LatLng(parseFloat(h.위도), parseFloat(h.경도))
              new Tmapv3.Marker({ map, position: hospitalPos, title: h.응급의료기관명 })
            })

            // Polyline 색상
            const colors = ['#0f0f0fff', '#a4e4a4ff', '#15153dff', '#ff00b3ff', '#d4e446ff']

            // 가까운 5개만 InfoWindow + Polyline
            for (let i = 0; i < nearestFive.length; i++) {
              const item = nearestFive[i]
              const h = item.hospital
              const hospitalPos = new Tmapv3.LatLng(parseFloat(h.위도), parseFloat(h.경도))

              // 경로 API
              const tmapRouteUrl =
                'https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=Zn5hqJeAaN1PnA3ovM8Y03NTGQ0uFQ3X7v1dl01M'
              const params = {
                startX: pos.coords.longitude,
                startY: pos.coords.latitude,
                endX: parseFloat(h.경도),
                endY: parseFloat(h.위도),
                reqCoordType: 'WGS84GEO',
                resCoordType: 'WGS84GEO',
                searchOption: 0,
                trafficInfo: 'Y',
              }
              const query = new URLSearchParams(params as any).toString()
              let routeData: any = null
              try {
                const res = await fetch(`${tmapRouteUrl}&${query}`)
                routeData = await res.json()
              } catch (err) {
                console.error('Tmap route fetch error', err)
              }

              let totalTime = 0
              let totalDistance = 0
              if (routeData) {
                if (routeData.summary) {
                  totalTime = routeData.summary.totalTime || 0
                  totalDistance = routeData.summary.totalDistance || 0
                } else if (routeData.features && routeData.features.length > 0 && routeData.features[0].properties) {
                  totalTime = routeData.features[0].properties.totalTime || 0
                  totalDistance = routeData.features[0].properties.totalDistance || 0
                }
              }

              const timeText = totalTime ? `${Math.ceil(totalTime / 60)}분` : '정보 없음'
              const distanceText = totalDistance ? `${totalDistance}m` : '정보 없음'

              // Polyline 좌표
              const pathCoords: any[] = []
              routeData?.features?.forEach((feature: any) => {
                if (feature.geometry.type === 'LineString') {
                  feature.geometry.coordinates.forEach((coord: any) => {
                    pathCoords.push(new Tmapv3.LatLng(coord[1], coord[0]))
                  })
                }
              })

              if (pathCoords.length) {
                const polyline = new Tmapv3.Polyline({
                  map,
                  path: pathCoords,
                  strokeWeight: 6,
                  strokeColor: colors[i],
                  strokeOpacity: 0.7,
                  strokeStyle: 'solid',
                })
                distanceLines.push(polyline)
              }

              // 가까운 순서대로 InfoWindow 생성
              new Tmapv3.InfoWindow({
                position: hospitalPos,
                content: `<div style="padding:5px; min-width:200px; max-width:300px;">
                  <b>${h.응급의료기관명}</b><br>
                  ${h.소재지}<br>
                  ${h.연락처}<br>
                  예상 소요 시간: ${timeText}<br>
                  예상 거리: ${distanceText}
                </div>`,
                map,
              })
            }

            setMapLoaded(true)
          },
          (err) => {
            alert('현재 위치를 가져올 수 없습니다.')
            console.error(err)
          }
        )
      },
    })
  }

  return (
    <div id="map3" style={{ width: '100%', height: '600px' }}>
      {!mapLoaded && <div>지도 불러오는 중...</div>}
    </div>
  )
}
