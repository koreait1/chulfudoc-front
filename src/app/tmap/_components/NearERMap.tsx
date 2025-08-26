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

export default function NearERMap() {
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
              center: new Tmapv3.LatLng(
                pos.coords.latitude,
                pos.coords.longitude,
              ),
              width: '100%',
              height: '600px',
              zoom: 14,
            })

            const userPos = new Tmapv3.LatLng(
              pos.coords.latitude,
              pos.coords.longitude,
            )
            const userMarker = new Tmapv3.Marker({ map, position: userPos, title: '현위치' })

            // 현위치 인포
            new Tmapv3.InfoWindow({
              position: userPos,
              content: `<div style="min-width:50px; min-height:50px;">
              <b>현위치</b>
              </div>`,
            type: 2, // 마커 위
            map,
            })

            // 병원 거리 계산
            const distances = hospitals
              .filter((h) => h.위도 && h.경도)
              .map((h) => {
                const lat = parseFloat(h.위도)
                const lng = parseFloat(h.경도)
                const dLat = lat - pos.coords.latitude
                const dLng = lng - pos.coords.longitude
                const dist = Math.sqrt(dLat * dLat + dLng * dLng)
                return { hospital: h, dist }
              })

            const nearestFive = distances
              .sort((a, b) => a.dist - b.dist)
              .slice(0, 5)
            const colors = [
              '#FF0000',
              '#00FF00',
              '#0000FF',
              '#FF00FF',
              '#FFA500',
            ]

            for (let i = 0; i < nearestFive.length; i++) {
              const { hospital: h } = nearestFive[i]
              const hospitalPos = new Tmapv3.LatLng(
                parseFloat(h.위도),
                parseFloat(h.경도),
              )

              // 병원 마커
              new Tmapv3.Marker({
                map,
                position: hospitalPos,
                title: h.응급의료기관명,
              })

              // Tmap route API
              try {
                const res = await fetch(
                  `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      startX: pos.coords.longitude,
                      startY: pos.coords.latitude,
                      endX: parseFloat(h.경도),
                      endY: parseFloat(h.위도),
                      reqCoordType: 'WGS84GEO',
                      resCoordType: 'WGS84GEO',
                      searchOption: 0,
                      trafficInfo: 'Y',
                    }),
                  },
                )
                const routeData = await res.json()

                // Polyline 좌표
                const pathCoords: any[] = []
                routeData.features?.forEach((feature: any) => {
                  if (feature.geometry.type === 'LineString') {
                    feature.geometry.coordinates.forEach((coord: number[]) => {
                      pathCoords.push(new Tmapv3.LatLng(coord[1], coord[0]))
                    })
                  }
                })

                if (pathCoords.length) {
                  new Tmapv3.Polyline({
                    map,
                    path: pathCoords,
                    strokeWeight: 4,
                    strokeColor: colors[i],
                    strokeOpacity: 0.7,
                    strokeStyle: 'solid',
                  })
                }

                // InfoWindow 생성
                new Tmapv3.InfoWindow({
                  position: hospitalPos,
                  content: `<div style="padding:5px; min-width:200px; max-width:300px;">
                  <b>${h.응급의료기관명}</b><br>
                  ${h.소재지}<br>
                  ${h.연락처}
                </div>`,
                  map,
                })
              } catch (err) {
                console.error('Tmap route fetch error', err)
              }
            }

            setMapLoaded(true)
          },
          (err) => {
            alert('현재 위치를 가져올 수 없습니다.')
            console.error(err)
          },
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
