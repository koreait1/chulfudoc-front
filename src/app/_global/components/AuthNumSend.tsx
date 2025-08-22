'use client'

import React, { useCallback, useState } from "react"
import { Button } from './Buttons'

import useFetchCSR from "../hooks/useFetchCSR"
import styled from "styled-components"
import Loading from "@/app/loading"

const StyledSection = styled.section`

`

type AuthType = {
    email?: string
    callback?: (item: any) => void
}

const AuthNumSend = ({email, callback}: AuthType) => {
    const fetchCSR = useFetchCSR()
    const [loading, setLoading] = useState(false);

    const onEmailSendClick = useCallback(() => {
        if(!email) return

        setLoading(true);

        function emailSendHandler(){
            
            fetchCSR(`/email/verify?email=${email}`)
            .then((res) => res.json())
            .then((item) => {
                if(typeof callback === 'function'){
                    callback(item)
                }
                setLoading(false)
            })
        }

        emailSendHandler()
        
    }, [fetchCSR, email, callback])

    return(
        <>
        {loading ? <Loading /> : 
        <Button type="button" onClick={onEmailSendClick}>
            인증번호 전송
        </Button>}
        </>
    )
}

export default React.memo(AuthNumSend)