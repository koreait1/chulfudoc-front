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
}

const AuthNumButton = ({data, apiUrl, callback, children, onStartTimer}: AuthType) => {
    const fetchCSR = useFetchCSR()
    const [loading, setLoading] = useState(false);

    const onEmailSendClick = useCallback(() => {
        if(!data) return

        if(apiUrl == ApiUrl.CHECKCODE && isNaN(data)){
            return
        }

        setLoading(true);

        onStartTimer?.()

        function emailAuthNumHandler(){
            
            fetchCSR(`${apiUrl}${data}`)
            .then((res) => res.json())
            .then((item) => {
                if(typeof callback === 'function'){
                    callback(item)
                }
                setLoading(false)
            })
        }

        emailAuthNumHandler()
        
    }, [fetchCSR, data, callback, onStartTimer])

    return(
        <>
            {loading ? <Loading /> :
            <Button type="button" onClick={onEmailSendClick}>
                {children}
            </Button>}
        </>
    )
}

export default React.memo(AuthNumButton)