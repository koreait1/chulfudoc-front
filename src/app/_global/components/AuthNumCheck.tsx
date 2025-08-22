'use client'

import React, { useCallback, useState } from "react"
import { Button } from './Buttons'

import useFetchCSR from "../hooks/useFetchCSR"
import styled from "styled-components"

const StyledSection = styled.section`

`

type AuthType = {
    authNum: any
    callback?: (item: any) => void
}

const AuthNumCheck = ({authNum , callback}: AuthType) => {
    const fetchCSR = useFetchCSR()
    const [loading, setLoading] = useState(false);

    const onCodeCheckClick = useCallback(() => {
        if(!authNum || isNaN(authNum)) return

        setLoading(true);

        function emailCheckHandler(){
            
            fetchCSR(`/email/check?authNum=${authNum}`)
            .then((res) => res.json())
            .then((item) => {
                if(typeof callback === 'function'){
                    callback(item)
                }
                setLoading(false)
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