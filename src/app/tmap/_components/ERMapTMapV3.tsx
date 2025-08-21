'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    Tmapv3: any
  }
}

export default function SimpleMap() {
  useEffect(() => {
    if (document.getElementById('tmap-script')) return

    const script = document.createElement('script')
    script.id = 'tmap-script'
    script.src =
      'https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=Zn5hqJeAaN1PnA3ovM8Y03NTGQ0uFQ3X7v1dl01M'
    script.async = true

    script.onload = () => {
      console.log('Tmapv3 스크립트 로드 완료')

      const initMap = () => {
        // Map 생성 전 반드시 객체 확인
        if (
          window.Tmapv3 &&
          window.Tmapv3.LatLng &&
          typeof window.Tmapv3.Map === 'function'
        ) {
          console.log('Tmapv3 객체 준비 완료:', window.Tmapv3)

          new window.Tmapv3.Map('map_div', {
            center: new window.Tmapv3.LatLng(37.566474, 126.985022),
            width: '100%',
            height: '400px',
          })
        } else {
          console.log('Tmapv3 아직 준비 안됨 → 재시도')
          setTimeout(initMap, 100)
        }
      }

      initMap()
    }

    script.onerror = () => {
      console.error('Tmapv3 스크립트 로드 실패')
    }

    document.head.appendChild(script)
  }, [])

  return <div id="map_div" style={{ width: '100%', height: '400px' }} />
}