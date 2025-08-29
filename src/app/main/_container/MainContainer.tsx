'use client'
import React from "react"
import { PageWrapper, PageMain } from "../_component/StyleWrapper"
import GradientText from "../_component/GradientText"
import { useState, useEffect } from "react"
import DetectContainer from "@/app/detect/_containers/DetectContainer"
import HosptialPopup from "@/app/_global/container/HospitalPopup"
import MainLinkContainer from "./MainLinkContainer"
import FloatingIconContainer from "@/app/_global/container/FloatingIconContainer"
import Orb from "../_component/Orb"
import background2 from '../../_global/assets/images/background2.png'
import Headers from "../../_global/outlines/Header"
import styled from "styled-components"

const StyledBackground = styled.div`
    position: absolute;
    inset: 0;
    background-image: url(${background2.src});
    background-size: cover;
    background-position: center;
    filter: brightness(0.5);
    z-index: 0;
`

const SectionOne = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    padding-top: 15px;
`

const MainContainer = () => {
    const [current, setCurrent] = useState(0)

    const goTop = () => setCurrent(0);

    const sections = [
        <SectionOne key={0}>
            <StyledBackground />
            <Headers />
            <PageMain>
                <span className="line_start">SAFETY</span>
                <GradientText className="highlight">WHERE</GradientText>
                <span className="line_end">YOU aRE</span>
                <Orb hoverIntensity={0.8} rotateOnHover={true} hue={318} forceHoverState={false} />
                <DetectContainer />
            </PageMain>
        </SectionOne>,
        <div key={1} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '3rem',
            background: 'transparent',
            color: '#000'
        }}>
            <h1>테스트</h1>
        </div>,
        <div key={2} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '3rem',
            background: 'transparent',
            color: '#000'
        }}>
            <div className="main-bottom">
                <HosptialPopup />
                <MainLinkContainer />
            </div>
        </div>
    ]

    useEffect(() => {
        let isScrolling = false
        const handleWheel = (e: WheelEvent) => {
        if (isScrolling) return
        isScrolling = true
        if (e.deltaY > 0) {
            setCurrent(prev => Math.min(prev + 1, sections.length - 1))
        }
        else {
            setCurrent(prev => Math.max(prev - 1, 0))
        }
        setTimeout(() => { isScrolling = false }, 800)
        }

        window.addEventListener('wheel', handleWheel)
        return () => window.removeEventListener('wheel', handleWheel)
    }, [sections.length])

    return (
        <>
            <PageWrapper /> 
            <div style={{ 
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                margin: 0,  
                padding: 0,
             }}>
                {sections.map((section, index) => (
                <div key={index} style={{
                width: '100vw',
                height: '100vh',
                transform: `translateY(-${current * 100}vh)`,
                transition: 'transform 0.7s ease'
                }}>
                {section}
                </div>
            ))}
            </div>
            <FloatingIconContainer section={current} goTop={goTop}/>
        </>
    )
}

export default React.memo(MainContainer)