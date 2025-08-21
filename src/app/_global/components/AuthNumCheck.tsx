'use client'

import React, { useCallback } from "react"
import { Button } from './Buttons'

import useFetchCSR from "../hooks/useFetchCSR"
import styled from "styled-components"

const StyledForm = styled.section`

`

type AuthType = {
    authNum?: number
    callback?: (item: any) => void
}

const AuthNumCheck = ({authNum , callback}: AuthType) => {
    const fetchCSR = useFetchCSR()

    const onCodeCheckClick = useCallback(() => {
        if(!authNum) return

        function emailCheckHandler(){
            
            fetchCSR(`/email/check?authNum=${authNum}`, {
                method: 'GET',
            })
            .then((res) => res.json())
            .then((item) => {
                if(typeof callback === 'function'){
                    callback(item)
                }
            })
        }

        emailCheckHandler()
        
    }, [fetchCSR, authNum, callback])

    return(
        <>
            <Button type="button" onClick={onCodeCheckClick}>
                인증하기
            </Button>
        </>
    )
}

export default React.memo(AuthNumCheck)