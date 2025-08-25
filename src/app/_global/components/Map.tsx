'use client'
import { memo, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Papa from 'papaparse'

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

  height = height ?? 600
  zoom = zoom ?? 11

  useEffect(() => {
    if (!mapRef.current) return
    const { Tmapv3 } = window

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const currentLatLon = new Tmapv3.LatLng(latitude, longitude)

      // 지도 생성
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
        content: `<div style="padding:5px; min-width:80px; max-width:120px;">현위치</div>`,
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
              // 기존 polyline 삭제
              if (polylineRef.current) polylineRef.current.setMap(null)

              // 기존 InfoWindow 닫기
              if (openInfoWindowRef.current)
                openInfoWindowRef.current.setMap(null)

              // 자동차 경로 API 호출
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
              const data = await res.json()

              // 경로 좌표 추출
              const path: any[] = []
              data.features?.forEach((feature: any) => {
                if (feature.geometry.type === 'LineString') {
                  feature.geometry.coordinates.forEach((coord: number[]) => {
                    path.push(new Tmapv3.LatLng(coord[1], coord[0]))
                  })
                }
              })

              // polyline 그리기
              const newPolyline = new Tmapv3.Polyline({
                path,
                strokeColor: '#FF0000',
                strokeWeight: 4,
                map,
              })
              polylineRef.current = newPolyline

              // 이동 거리 / 예상 시간
              let totalDistance = 0
              let totalTime = 0
              if (data.features[0]?.properties) {
                totalDistance = data.features[0].properties.totalDistance || 0
                totalTime = data.features[0].properties.totalTime || 0
              }

              // InfoWindow 표시
              const infoWindow = new Tmapv3.InfoWindow({
                position: hospitalPos,
                content: `<div style="padding:5px; min-width:200px; max-width:300px;">
                  <b>${h.응급의료기관명}</b><br>
                  ${h.소재지}<br>
                  병원 전화 번호 : ${h.연락처}<br>
                  이동 거리: ${(totalDistance / 1000).toFixed(2)} km<br>
                  예상 소요 시간: ${Math.round(totalTime / 60)}분
                </div>`,
                map,
              })

              openInfoWindowRef.current = infoWindow
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