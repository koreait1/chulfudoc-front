'use client'

import { useState } from 'react'
import NearERInfo from '../_components/NearERInfo'
import NearERMap from '../_components/NearERMap'

export default function ERLContainer() {
  const [blocked, setBlocked] = useState(false) // 호출제한 상태

  return (
    <div>
      <NearERMap onBlocked={setBlocked} />
      {!blocked && <NearERInfo />}
    </div>
  )
}
