import React from "react"
import { PageWrapper, PageMain } from "../_component/StyleWrapper"

const PageStyleContainer = () => {

    return (
        <>
            <PageWrapper /> 
            <PageMain>
                <span>SAFETY</span>
                <span className="highlight">where</span>
                <span>YOU are</span>
            </PageMain>
        </>
    )
}

export default React.memo(PageStyleContainer)