'use client'
import { useEffect } from 'react'

export default function DBERMap() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=e5b92d42b15969021e6f0020012e0173&autoload=false'
    script.async = true

    script.onload = () => {
      window.kakao.maps.load(async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/hospital/list`,
          )
          const data = await res.json()
          if (!data.length) return

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude
              const userLon = position.coords.longitude

              const container = document.getElementById('map')
              const map = new window.kakao.maps.Map(container, {
                center: new window.kakao.maps.LatLng(userLat, userLon),
                level: 7,
              })

              const userPos = new window.kakao.maps.LatLng(userLat, userLon)
              const userMarker = new window.kakao.maps.Marker({
                map,
                position: userPos,
              })
              const userInfo = new window.kakao.maps.InfoWindow({
                content: '<div style="padding:5px;">현위치</div>',
              })
              userInfo.open(map, userMarker)

              let distanceLine = null
              let distanceOverlay = null
              let openInfoWindow = null

              data.forEach((loc) => {
                if (!loc.lat || !loc.lon) return
                const hospitalLat = parseFloat(loc.lat)
                const hospitalLon = parseFloat(loc.lon)
                if (isNaN(hospitalLat) || isNaN(hospitalLon)) return

                const hospitalPos = new window.kakao.maps.LatLng(
                  hospitalLat,
                  hospitalLon,
                )
                const marker = new window.kakao.maps.Marker({
                  map,
                  position: hospitalPos,
                })

                const address = loc.address ? loc.address.trim() : '주소 없음'
                const phone = loc.mobile ? loc.mobile.trim() : '전화번호 없음'

                const info = new window.kakao.maps.InfoWindow({
                  content: `
                    <div style="padding:5px; min-width:200px; max-width:300px; height:85px;">
                      <b>${loc.name}</b><br>
                      <div>${address}<br>${phone}</div>
                    </div>
                  `,
                })

                window.kakao.maps.event.addListener(marker, 'click', () => {
                  if (openInfoWindow === info) {
                    info.close()
                    openInfoWindow = null
                    if (distanceLine) distanceLine.setMap(null)
                    if (distanceOverlay) distanceOverlay.setMap(null)
                    distanceLine = null
                    distanceOverlay = null
                    return
                  }

                  if (openInfoWindow) openInfoWindow.close()
                  openInfoWindow = info
                  info.open(map, marker)

                  if (distanceLine) distanceLine.setMap(null)
                  if (distanceOverlay) distanceOverlay.setMap(null)

                  distanceLine = new window.kakao.maps.Polyline({
                    map,
                    path: [userPos, hospitalPos],
                    strokeWeight: 3,
                    strokeColor: '#db4040',
                    strokeOpacity: 1,
                    strokeStyle: 'solid',
                  })

                  const distance = Math.round(distanceLine.getLength())
                  const content = `
                    <ul style="background:white; padding:5px; border-radius:5px; border:1px solid #ccc; position: relative; top:25px; left:30px;">
                      <li>총거리 <span class="number">${distance}</span>m</li>
                      <li>도보 ${Math.floor(
                        distance / 50 / 60,
                      )}시간 ${Math.floor((distance / 50) % 60)}분</li>
                      <li>자전거 ${Math.floor(
                        distance / 150 / 60,
                      )}시간 ${Math.floor((distance / 150) % 60)}분</li>
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
                })
              })
            },
            (err) => {
              alert('현재 위치를 가져올 수 없습니다.')
              console.error(err)
            },
          )
        } catch (e) {
          console.error(e)
        }
      })
    }

    document.head.appendChild(script)
  }, [])

  return <div id="map" style={{ width: '100%', height: '600px' }} />
}
