'use client'

import React, { useCallback } from "react"
import { Button } from './Buttons'

import useFetchCSR from "../hooks/useFetchCSR"
import styled from "styled-components"

const StyledSection = styled.section`

`

type AuthType = {
    email?: string
    callback?: (item: any) => void
}

const AuthNumSend = ({email, callback}: AuthType) => {
    const fetchCSR = useFetchCSR()

    const onEmailSendClick = useCallback(() => {
        if(!email) return

        function emailSendHandler(){
            
            fetchCSR(`/email/verify?email=${email}`, {
                method: 'GET',
            })
            .then((res) => res.json())
            .then((item) => {
                if(typeof callback === 'function'){
                    callback(item)
                }
            })
        }

        emailSendHandler()
        
    }, [fetchCSR, email, callback])

    return(
        <>
            <Button type="button" onClick={onEmailSendClick}>
                인증번호 전송
            </Button>
        </>
    )
}

export default React.memo(AuthNumSend)