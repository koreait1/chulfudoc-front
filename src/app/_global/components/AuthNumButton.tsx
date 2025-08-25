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
    callback?: (item: any) => void
    children?: React.ReactNode
    onStartTimer?: () => void
    onRequestStart?: () => void
    width?: number
}

const AuthNumButton = ({data, apiUrl, callback, children, onStartTimer, onRequestStart, width}: AuthType) => {
    const fetchCSR = useFetchCSR()
    const [loading, setLoading] = useState(false);
    let status: number

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
                if (res.status >= 200 && res.status < 300) {
                    onStartTimer?.()
                }
                setLoading(false)
            })
            .catch((e) => {
                console.error(e)
                setLoading(false)
            })
            .finally(() => setLoading(false))
        }

        emailAuthNumHandler()
        
    }, [fetchCSR, data, callback, onStartTimer, onRequestStart])

    return(
        <>
            {loading ? <Loading /> :
            <Button type="button" onClick={onEmailSendClick} width={width}>
                {children}
            </Button>}
        </>
    )
}

export default React.memo(AuthNumButton)