'use client'
import { useState } from 'react'
import LayerPopup from '../components/LayerPopup'
import GERMapContainer from '@/app/tmap/_containers/GERMapContainer'
import { FaHospital } from 'react-icons/fa'

export default function HosptialPopup() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        <h1>전국 응급의료기관</h1>
        <FaHospital size={150} />
      </button>
      <LayerPopup
        isOpen={isOpen}
        title="응급의료기관"
        onClose={() => setIsOpen(false)}
        width={'80%'}
        height={'800px'}
      >
        <GERMapContainer />
      </LayerPopup>
    </>
  )
}
