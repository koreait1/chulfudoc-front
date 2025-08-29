'use client'
import React from 'react'
import PasswordForm from '../_components/PasswordForm'

const PasswordContainer = ({ mode, seq }) => {
  return <PasswordForm mode={mode} seq={seq} />
}

export default React.memo(PasswordContainer)
