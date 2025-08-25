'use client'

import React, { useActionState } from 'react'
import { processFindPw } from '../_services/actions'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import FindPwForm from '../_components/FindPwForm'

const initialErrors: any = {}

export default function FindPwContainer() {
  const [errors, action] = useActionState(processFindPw, initialErrors)
  const alertDialog = useAlertDialog()

  return <FindPwForm errors={errors} action={action} />
}
