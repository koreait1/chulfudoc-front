'use client'
import { memo, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Papa from 'papaparse'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'

declare global {
  interface Window {
    Tmapv3: any
  }
}

interface Hospital {
  응급의료기관명: string
  위도: string
  경도: string
  소재지: string
  연락처: string
}

type MapType = {
  width?: number
  height?: number
  zoom?: number
}

const Wrapper = styled.div<{ width?: number; height?: number }>`
  min-width: 600px;
  max-width: 1150px;
  margin: 0 auto 20px auto;
  .vsm-canvas {
    border: 2px solid #333 !important;
    border-radius: 8px;
  }
  width: 100%;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
  ${({ height }) => (height ? height : 600)}px;
`

const Map = ({ width, height, zoom }: MapType) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const openInfoWindowRef = useRef<any>(null) // 현재 InfoWindow
  const polylineRef = useRef<any>(null) // 현재 polyline
  const alertDialog = useAlertDialog()

  height = height ?? 600
  zoom = zoom ?? 11

  const initialized = useRef(false)

  useEffect(() => {
    if (!mapRef.current || initialized.current) return

    initialized.current = true

    const { Tmapv3 } = window
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const currentLatLon = new Tmapv3.LatLng(latitude, longitude)

      const map = new Tmapv3.Map(mapRef.current, {
        center: currentLatLon,
        width: `100%`,
        height: `${height}px`,
        zoom,
      })

      // 현재 위치 마커
      new Tmapv3.Marker({
        position: currentLatLon,
        map,
        title: '현재 위치',
      })

      // 현재 위치 InfoWindow
      new Tmapv3.InfoWindow({
        position: currentLatLon,
        content: `<div class="current-location-info">현위치</div`,
        map,
      })

      // 병원 마커 표시
      Papa.parse('/ERPlusPlus.csv', {
        download: true,
        header: true,
        complete: (result) => {
          const hospitals: Hospital[] = result.data as Hospital[]
          hospitals.forEach((h) => {
            if (!h.위도 || !h.경도) return

            const hospitalPos = new Tmapv3.LatLng(
              parseFloat(h.위도),
              parseFloat(h.경도),
            )

            const hospitalMarker = new Tmapv3.Marker({
              map,
              position: hospitalPos,
              title: h.응급의료기관명,
            })

            hospitalMarker.on('Click', async () => {
              if (polylineRef.current) polylineRef.current.setMap(null)
              if (openInfoWindowRef.current)
                openInfoWindowRef.current.setMap(null)

              try {
                const res = await fetch(
                  `https://apis.openapi.sk.com/tmap/routes?version=1&format=json&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      startX: currentLatLon.lng(),
                      startY: currentLatLon.lat(),
                      endX: hospitalPos.lng(),
                      endY: hospitalPos.lat(),
                      reqCoordType: 'WGS84GEO',
                      resCoordType: 'WGS84GEO',
                      searchOption: 0,
                      trafficInfo: 'Y',
                    }),
                  },
                )

                if (res.status === 429) {
                    alertDialog({
                      text: 'API 호출 제한을 초과했습니다. 잠시 후 다시 시도해주세요.',
                      icon: 'error',
                      callback: () => {
                        window.location.href = '/'
                      },
                    })
                  return
                }

                if (!res.ok) {
                  throw new Error(`API Error: ${res.status}`)
                }
                const data = await res.json()

                const path: any[] = []
                data.features?.forEach((feature: any) => {
                  if (feature.geometry.type === 'LineString') {
                    feature.geometry.coordinates.forEach((coord: number[]) => {
                      path.push(new Tmapv3.LatLng(coord[1], coord[0]))
                    })
                  }
                })

                if (path.length) {
                  const newPolyline = new Tmapv3.Polyline({
                    path,
                    strokeColor: '#FF0000',
                    strokeWeight: 4,
                    map,
                  })
                  polylineRef.current = newPolyline
                }

                // InfoWindow 표시 (기존 코드 그대로)
                const totalDistance =
                  data.features[0]?.properties?.totalDistance ?? 0
                const totalTime = data.features[0]?.properties?.totalTime ?? 0

                const infoWindow = new Tmapv3.InfoWindow({
                  position: hospitalPos,
                  content: `<div id="hospital-info" style="min-width:200px; max-width:300px;">
                    <b>${h.응급의료기관명}</b><br>
                    ${h.소재지}<br>
                    병원 전화 번호 : ${h.연락처}<br>
                    이동 거리: ${(totalDistance / 1000).toFixed(2)} km<br>
                    차량 소요 시간: ${Math.round(totalTime / 60)}분
                    <div style="color: rgba(233, 33, 33, 1); cursor: pointer;" 
                      onmouseover="this.style.textDecoration='underline'" 
                      onmouseout="this.style.textDecoration='none'">
                      (병원 정보 닫기)
                    </div>
                  </div>`,
                  map,
                })

                openInfoWindowRef.current = infoWindow
                setTimeout(() => {
                  const el = document.getElementById('hospital-info')
                  if (el) {
                    el.addEventListener('click', () => infoWindow.setMap(null))
                  }
                }, 0)
              } catch (err) {
                console.error(err)
                alert('경로 정보를 가져오는 중 오류가 발생했습니다.')
              }
            })
          })
        },
      })
    })
  }, [width, height, zoom])

  return (
    <Wrapper width={width} height={height}>
      <div ref={mapRef}></div>
    </Wrapper>
  )
}

export default memo(Map)
