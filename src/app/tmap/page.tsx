'use client'

import ERMapContiner from './_containers/ERMapContainer'
import ERLContainer from './_containers/ERLContainer'

export default function TMapPage() {
  return (
    <>
      <ERMapContiner />
      {/*<ERLContainer />*/} {/* API 호출을 너무 잡아먹어서 주석 처리 */}
    </>
  )
}
