/* eslint-disable @next/next/no-sync-scripts */
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
  const [currentAddress, setCurrentAddress] = useState('')

  useEffect(() => {
    if (!window.Tmapv3) return // TMapv3 로드 확인

    const { Tmapv3 } = window

    // CSV 읽기
    Papa.parse('/ERPlusPlus.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const data: Hospital[] = result.data
        if (!data.length) return

        navigator.geolocation.getCurrentPosition(
          (p) => {
            // 지도 생성
            const map = new Tmapv3.Map('map3', {
              center: new Tmapv3.LatLng(p.coords.latitude, p.coords.longitude),
              width: '100%',
              height: '600px',
              zoom: 16,
            })

            const userPos = new Tmapv3.LatLng(
              p.coords.latitude,
              p.coords.longitude,
            )

            // 현위치 마커 + InfoWindow
            const userMarker = new Tmapv3.Marker({
              map,
              position: userPos,
              title: '현위치',
            })

            const userInfo = new Tmapv3.InfoWindow({
              position: userPos,
              content: `<div>현위치</div>`,
              map: map,
            })

            let openInfoWindow: any = null
            let distanceLine: any = null

            // 병원 마커
            data.forEach((loc) => {
              if (!loc.위도 || !loc.경도) return

              const hospitalPos = new Tmapv3.LatLng(
                parseFloat(loc.위도),
                parseFloat(loc.경도),
              )

              const marker = new Tmapv3.Marker({
                map,
                position: hospitalPos,
                title: loc.응급의료기관명,
              })

              const info = new Tmapv3.InfoWindow({
                position: hospitalPos,
                content: `<div style="padding:5px; min-width:200px; max-width:300px;">
                  <b>${loc.응급의료기관명}</b><br>
                  ${loc.소재지}<br>
                  ${loc.연락처}
                </div>`,
              })

              // 클릭 이벤트
              Tmapv3.event.addListener(marker, 'click', async () => {
                // 기존 InfoWindow 닫기
                if (openInfoWindow) openInfoWindow.setMap(null)
                openInfoWindow = info
                info.setMap(map)

                // 기존 Polyline 제거
                if (distanceLine) {
                  distanceLine.setMap(null)
                  distanceLine = null
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

                const query = new URLSearchParams(params as any).toString()
                const routeData = await fetch(`${tmapRouteUrl}&${query}`)
                  .then((res) => res.json())
                  .catch(() => null)

                const pathCoords: any[] = []

                if (routeData?.features?.length) {
                  const geometry = routeData.features[0].geometry.coordinates
                  const flatten = (arr: any[]) => {
                    arr.forEach((item) => {
                      if (Array.isArray(item[0])) flatten(item)
                      else pathCoords.push(new Tmapv3.LatLng(item[1], item[0]))
                    })
                  }
                  flatten(geometry)
                }

                if (pathCoords.length) {
                  distanceLine = new Tmapv3.Polyline({
                    map,
                    path: pathCoords,
                    strokeWeight: 5,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.7,
                    strokeStyle: 'solid',
                  })
                }
              })
            })
          },
          (err) => {
            alert('현재 위치를 가져올 수 없습니다.')
            console.error(err)
          },
        )
      },
    })
  }, [])

  return (
    <div
      id="map3"
      style={{ width: '100%', height: '600px' }}
      suppressHydrationWarning
    />
  )
}
