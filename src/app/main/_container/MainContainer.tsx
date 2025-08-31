'use client'
import React from "react"
import { PageWrapper, PageMain } from "../_component/StyleWrapper"
import GradientText from "../_component/GradientText"
import { useState, useEffect } from "react"
import DetectContainer from "@/app/detect/_containers/DetectContainer"
import HosptialPopup from "@/app/_global/container/HospitalPopup"
import FloatingIconContainer from "@/app/_global/container/FloatingIconContainer"
import Orb from "../_component/Orb"
import background2 from '../../_global/assets/images/background2.png'
import background3 from '../../_global/assets/images/background3.png'
import Headers from "../../_global/outlines/Header"
import styled from "styled-components"
import SplitText from "../_component/SplitText"
import AnimatedContent from "../_component/AnimatedContent"

type BackgroundType = {
    img: string
    brightness?: number
}

const StyledBackground = styled.div<BackgroundType>`
    position: absolute;
    inset: 0;
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center;
    filter: brightness(${props => props.brightness});
    z-index: -1;
`

const Section = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    padding-top: 15px;
`

const MainContainer = () => {
    const [current, setCurrent] = useState(0)
    const [webcamAble, setWebcamAble] = useState(false)

    const goTop = () => setCurrent(0);

    const sections = [
        <Section key={0}>
            <StyledBackground img={background2.src} brightness={0.5}/>
            <Headers />
            <PageMain>
                {webcamAble ? (
                        <DetectContainer webcamAble={webcamAble} onChange={(item) => setWebcamAble(item)}/>
                    ) : (
                        <>
                            <span className="line_start">SAFETY</span>
                            <GradientText className="highlight">WHERE</GradientText>
                            <span className="line_end">YOU aRE</span>
                            <Orb hoverIntensity={0.8} rotateOnHover={true} hue={318} forceHoverState={false} />
                            <DetectContainer webcamAble={webcamAble} onChange={(item) => setWebcamAble(item)}/>
                        </>
                    )
                }
            </PageMain>
        </Section>,
        <Section key={1}>
            <StyledBackground img={background3.src} brightness={0.4}/>

            <SplitText
                text="언제"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.8}
                currentSection={current}
                sectionIndex={1} 
                tag="h1"
            />
            <SplitText
                text="어디서나,"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.8}
                currentSection={current}
                sectionIndex={1} 
                tag="h1"
                startDelay={0.3}
            />
            <br />
            <SplitText
                text="병원 정보를"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.8}
                currentSection={current}
                sectionIndex={1} 
                tag="h1"
                startDelay={0.7}
            />
            <SplitText
                text="손쉽게!"
                className="text-2xl font-semibold text-center"
                delay={100}
                duration={0.8}
                currentSection={current}
                sectionIndex={1} 
                tag="h1"
                startDelay={1.4}
            />
            <br />
            <AnimatedContent currentSection={current} sectionIndex={1} distance={50} delay={0.5}>
                <HosptialPopup />
            </AnimatedContent>
        </Section>
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