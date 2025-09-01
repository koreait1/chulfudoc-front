'use client'
import React, { useEffect, useState, useRef } from 'react'
import Papa from 'papaparse'
import styled from 'styled-components'
import lineColors from '@/app/_global/styles/linecolor'
import ERSearchForm from './ERSearchForm'
import useAPIAlertDialog from '../hooks/useAPIAlertDialog'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import Loading from '@/app/loading'
import { createPortal } from 'react-dom'

interface Hospital {
  응급의료기관명: string
  위도: string
  경도: string
  소재지: string
  연락처: string
}

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
  min-width: 600px;
  max-width: 1150px;
  margin: auto auto 0;

  .vsm-canvas {
    border: 2px solid #333;
    border-radius: 8px;
  }
`

declare global {
  interface Window {
    Tmapv3: any
  }
}

interface SearchProps {
  initialKeyword?: string
  initialOption?: 'ALL' | 'NAME' | 'ADDR'
}

export default function SearchERMap({ initialKeyword = '', initialOption = 'ALL' }: SearchProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [keyword, setKeyword] = useState(initialKeyword)
  const [search, setSearch] = useState(initialKeyword)
  const [option, setOption] = useState<'ALL' | 'NAME' | 'ADDR'>(initialOption)
  const mapRef = useRef<any>(null) // Tmap Map 객체 저장용
  const markersRef = useRef<any[]>([]) // 마커 저장
  const linesRef = useRef<any[]>([]) // 라인 저장
  const infosRef = useRef<any[]>([]) // InfoWindow 저장
  const errorRef = useRef(false) // 다중 알람 방지
  const alertDialog = useAPIAlertDialog()
  const searchAlertDialog = useAlertDialog()
  const [loading, setLoading] = useState(false)

  // CSV 불러오기
  useEffect(() => {
    Papa.parse('/ERPlusPlus.csv', {
      download: true,
      header: true,
      complete: (result) => setHospitals(result.data as Hospital[]),
    })
  }, [])

  // 맵 초기화 (최초 1회만)
  useEffect(() => {
    if (!window.Tmapv3) return
    if (mapRef.current) return // 이미 map이 있으면 실행하지 않음

    const geoSuccess = (pos: GeolocationPosition) => {
      if (mapRef.current) return // 중복 생성 방지

      const map = new window.Tmapv3.Map('map3', {
        center: new window.Tmapv3.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        ),
        width: '100%',
        height: '600px',
        zoom: 14,
      })
      mapRef.current = map

      // 현위치 마커
      const userPos = new window.Tmapv3.LatLng(
        pos.coords.latitude,
        pos.coords.longitude,
      )
      new window.Tmapv3.Marker({ map, position: userPos, title: '현위치' })
      new window.Tmapv3.InfoWindow({
        position: userPos,
        content: `<div style="min-width:50px; min-height:50px;"><b>현위치</b></div>`,
        type: 2,
        map,
      })
    }

    navigator.geolocation.getCurrentPosition(geoSuccess)
  }, [])

  // 검색 실행
  useEffect(() => {
    if (!search || !mapRef.current || hospitals.length === 0) return
    renderHospitals()
  }, [search, hospitals])

  const renderHospitals = async () => {
    const Tmapv3 = window.Tmapv3
    const map = mapRef.current

    setLoading(true) // 로딩 시작

    // 기존 마커/라인/InfoWindow 제거
    markersRef.current.forEach((m) => m.setMap(null))
    linesRef.current.forEach((l) => l.setMap(null))
    infosRef.current.forEach((i) => i.setMap(null))
    markersRef.current = []
    linesRef.current = []
    infosRef.current = []

    // 현위치 좌표 구하기
    const pos = await new Promise<GeolocationPosition>((resolve) =>
      navigator.geolocation.getCurrentPosition(resolve),
    )

    const filtered = hospitals.filter((h) => {
      if (!h.위도 || !h.경도) return false
      const nameMatch = h.응급의료기관명?.includes(search)
      const addrMatch = h.소재지?.includes(search)
      if (option === 'ALL') return nameMatch || addrMatch
      if (option === 'NAME') return nameMatch
      if (option === 'ADDR') return addrMatch
      return false
    })

    if (filtered.length === 0) {
      setLoading(false)
      searchAlertDialog({
        text: `"${search}"에 대한 검색 결과가 없습니다.`,
        icon: 'info',
        callback: () => {
          errorRef.current = false
          window.location.reload()
        },
      })
      return
    }

    for (let i = 0; i < filtered.length; i++) {
      const h = filtered[i]
      const hospitalPos = new Tmapv3.LatLng(
        parseFloat(h.위도),
        parseFloat(h.경도),
      )

      // 병원 마커
      const marker = new Tmapv3.Marker({
        map,
        position: hospitalPos,
        title: h.응급의료기관명,
      })
      markersRef.current.push(marker)

      let distanceKm = 0 // 도로 거리 초기화

      // 경로 API
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
        const data = await res.json()

        const pathCoords: any[] = []
        data.features?.forEach((f: any) => {
          if (f.geometry.type === 'LineString') {
            f.geometry.coordinates.forEach((coord: number[]) => {
              pathCoords.push(new Tmapv3.LatLng(coord[1], coord[0]))
            })
          }
          // 도로 거리 합산 (meter -> km)
          if (f.properties?.distance) {
            distanceKm += Number(f.properties.distance) / 1000
          }
        })

        if (pathCoords.length) {
          const polyline = new Tmapv3.Polyline({
            map,
            path: pathCoords,
            strokeWeight: 4,
            strokeColor: lineColors[i % lineColors.length],
            strokeOpacity: 0.7,
            strokeStyle: 'solid',
          })
          linesRef.current.push(polyline)
        }
      } catch (err) {
        console.error('Tmap route fetch error', err)
        if (!errorRef.current) {
          errorRef.current = true
          alertDialog({
            text: '현재 위치를 가져올 수 없습니다',
            icon: 'error',
            mainCallback: () => {
              errorRef.current = false
              window.location.href = '/'
            },
            reloadCallback: () => {
              errorRef.current = false
              window.location.reload()
            },
          })
        }
      }

      // InfoWindow에 도로 거리 표시
      const info = new Tmapv3.InfoWindow({
        position: hospitalPos,
        content: `<div style="padding:5px; min-width:200px; max-width:300px;">
        <b>${h.응급의료기관명}</b><br/>
        ${h.소재지}<br/>
        ${h.연락처}<br/>
        도로 거리: ${distanceKm.toFixed(2)} km
      </div>`,
        type: 2,
        map,
      })
      infosRef.current.push(info)

      // 경로 API 2차 호출 (API 제한 체크)
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

        if (res.status === 429) {
          setLoading(false)
          if (!errorRef.current) {
            errorRef.current = true
            alertDialog({
              text: 'API 호출 제한을 초과했습니다.',
              icon: 'error',
              mainCallback: () => {
                errorRef.current = false
                window.location.href = '/'
              },
              reloadCallback: undefined,
            })
          }
          return
        }

        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`)
        }

        const data = await res.json()

        const pathCoords: any[] = []
        data.features?.forEach((f: any) => {
          if (f.geometry.type === 'LineString') {
            f.geometry.coordinates.forEach((coord: number[]) => {
              pathCoords.push(new Tmapv3.LatLng(coord[1], coord[0]))
            })
          }
        })

        if (pathCoords.length) {
          const polyline = new Tmapv3.Polyline({
            map,
            path: pathCoords,
            strokeWeight: 4,
            strokeColor: lineColors[i % lineColors.length],
            strokeOpacity: 0.7,
            strokeStyle: 'solid',
          })
          linesRef.current.push(polyline)
        }
      } catch (err) {
        if (!errorRef.current) {
          errorRef.current = true
          console.log(err)
          alertDialog({
            text: '지도에 경로를 표시하는 중 오류가 발생했습니다.',
            icon: 'error',
            mainCallback: () => {
              errorRef.current = false
              window.location.href = '/'
            },
            reloadCallback: () => {
              errorRef.current = false
              window.location.reload()
            },
          })
        }
      }
    }
    setLoading(false) // 로딩 끝
  }

  const handleSearch = () => setSearch(keyword)

  return (
    <>
    {loading &&
      createPortal(
        <Loading text="병원 찾는중" width="100vw" height="100vh" />,
        document.body
      )}
    <Wrapper>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>지도에서 검색하기</h1>
      <ERSearchForm
        keyword={keyword}
        setKeyword={setKeyword}
        option={option}
        setOption={setOption}
        onSearch={handleSearch}
      />
      <div id="map3" style={{ width: '100%', height: '600px' }}></div>
    </Wrapper>
    </>
  )
}
