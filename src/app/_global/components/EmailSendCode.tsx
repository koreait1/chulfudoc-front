'use client'
import React, { useCallback, useState } from "react"
import { Button } from './Buttons'
import useFetchCSR from "../hooks/useFetchCSR"

type EmailAuthType = {
    email?: string
    callback?: (item: any) => void
}

const EmailBox = ({email, callback}: EmailAuthType) => {
    const fetchCSR = useFetchCSR()

    const onEmailSendClick = useCallback(() => {

        function emailSendHandler(){
            // email 외 다른 값 전송이 필요할 경우를 대비하여 formData를 이용해 값을 받게 설정
            const formData = new FormData()
            formData.append('email', '' + email)

            fetchCSR('/email/verify', {
                method: 'GET',
                body: formData
            })
            .then((res) => res.json())
            .then((item) => {
                const success = item.emailSuccess
                console.log(success)
            })
        }
        
    }, [fetchCSR, email, callback])

    return(
        <>
            <Button type="button" onClick={onEmailSendClick}>
                인증번호 전송
            </Button>
        </>
    )
}

export default React.memo(EmailBox)