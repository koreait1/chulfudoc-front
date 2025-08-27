'use client'

import React, { useCallback, useState } from "react"
import { Button } from './Buttons'
import useFetchCSR from "../hooks/useFetchCSR"
import styled from "styled-components"
import Loading from "@/app/loading"
import { ApiUrl } from "../constants/ApiUrl"

const StyledSection = styled.section`

`
type AuthType = {
    data?: any
    apiUrl: ApiUrl
    width?: string
    callback?: (item: any) => void
    children?: React.ReactNode
    onStartTimer?: () => void
    onRequestStart?: () => void
}

const AuthNumButton = ({data, apiUrl, width, callback, children, onStartTimer, onRequestStart}: AuthType) => {
    const fetchCSR = useFetchCSR()
    const [loading, setLoading] = useState(false);
    let status: number
    let item : any

    const onEmailSendClick = useCallback(() => {
        if(!data) return

        if(apiUrl == ApiUrl.CHECKCODE && isNaN(data)){
            return
        }

        onRequestStart?.()
        setLoading(true);
        
        function emailAuthNumHandler(){
            fetchCSR(`${apiUrl}${data}`)
            .then((res) => {
                if(typeof callback === 'function'){
                    callback({ status: res.status })
                }
                setLoading(false)
                if (item?.emailSuccess) {
                    onStartTimer?.()
                }
            })
            .catch((e) => {
                console.error(e)
                setLoading(false)
            })
            .finally(() => setLoading(false))
        }

        emailAuthNumHandler()
        
    }, [fetchCSR, data, callback, onStartTimer, onRequestStart, item])

    return(
        <>
            {loading ? <Loading text="이메일 발송 중" /> :
            <Button type="button" onClick={onEmailSendClick} width={width}>
                {children}
            </Button>}
        </>
    )
}

export default React.memo(AuthNumButton)