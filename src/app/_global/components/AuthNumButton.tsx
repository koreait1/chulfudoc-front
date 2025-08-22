'use client'

import React, { useCallback, useState } from "react"
import { Button } from './Buttons'

import useFetchCSR from "../hooks/useFetchCSR"
import styled from "styled-components"
import Loading from "@/app/loading"

const StyledSection = styled.section`

`

const AuthNumButton = (data?: any) => {
    const fetchCSR = useFetchCSR()
    const [loading, setLoading] = useState(false);

    const onEmailSendClick = useCallback(() => {
        if(!data) return

        setLoading(true);

        function emailSendHandler(){
            
            fetchCSR(`/email/verify?email=${data}`)
            .then((res) => res.json())
            .then(() => {
                console.log("버튼 기능 완료")
                setLoading(false)
            })
        }

        emailSendHandler()
        
    }, [fetchCSR, data])

    return(
        <>
            <Button type="button" onClick={onEmailSendClick}>
                인증번호 전송
            </Button>
            {loading && <Loading />}
        </>
    )
}

export default React.memo(AuthNumButton)