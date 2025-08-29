'use client'

import React, { useCallback, useState } from 'react'
import { Button } from './Buttons'
import useFetchCSR from '../hooks/useFetchCSR'
import styled from 'styled-components'
import Loading from '@/app/loading'
import { ApiUrl } from '../constants/ApiUrl'
import useAlertDialog from '../hooks/useAlertDialog'

const StyledSection = styled.section``

type UserInputData = {
  email?: string
  authNum?: number
}

type AuthType = {
  data?: any
  apiUrl: ApiUrl
  width?: string
  children?: React.ReactNode
  callback?: (item: any) => void
  onStartTimer?: () => void
  onRequestStart?: () => void
}

const AuthNumButton = ({
  data,
  apiUrl,
  width,
  callback,
  children,
  onStartTimer,
  onRequestStart,
}: AuthType) => {
  const fetchCSR = useFetchCSR()
  const [loading, setLoading] = useState(false)
  const alertDialog = useAlertDialog()

  const onEmailSendClick = useCallback(() => {
    if ((!data && data == '') || data?.email == '') {
      alertDialog({
        title: '인증 실패',
        text: '인증 번호를 확인해주세요.',
        icon: 'error',
      })
      return
    }

    onRequestStart?.()
    setLoading(true)

    function emailAuthNumHandler() {
      fetchCSR(`${apiUrl}${data}`)
        .then((res) => {
          if (typeof callback === 'function') {
            callback({ status: res.status })
          }
          if (res.status >= 200 && res.status < 300) {
            onStartTimer?.()
          }
          setLoading(false)
        })
        .catch((e) => {
          //console.error(e)
          alertDialog({
            title: '발송 실패',
            text: '입력하신 정보를 확인해주세요.',
            icon: 'error',
          })
          setLoading(false)
        })
        .finally(() => setLoading(false))
    }

    emailAuthNumHandler()
  }, [fetchCSR, data, callback, onStartTimer, onRequestStart])

  return (
    <>
      {loading ? (
        <Loading text="이메일 발송 중" />
      ) : (
        <Button type="button" onClick={onEmailSendClick} width={width}>
          {children}
        </Button>
      )}
    </>
  )
}

export default React.memo(AuthNumButton)
