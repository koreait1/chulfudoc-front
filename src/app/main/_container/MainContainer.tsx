'use client'
import React from "react"
import { PageWrapper, PageMain } from "../_component/StyleWrapper"
import GradientText from "../_component/GradientText"
import { useState, useEffect } from "react"

const MainContainer = ({ children }: {children: React.ReactNode}) => {
    const [current, setCurrent] = useState(0)
    const [detectState, setDetectState] = useState()
    const childArray = React.Children.toArray(children)

    const sections = [
        <div key={0}>
            <PageMain>
                <span className="line_start">SAFETY</span>
                <GradientText className="highlight">WHERE</GradientText>
                <span className="line_end">YOU aRE</span>
            </PageMain>
            {childArray[0]}
            {/*{React.cloneElement(childArray[0] as React.ReactElement, { value: detectState, setValue: setDetectState })}*/}
        </div>,
        <div key={1} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '3rem',
            backgroundColor: '#4079ff',
            color: '#fff'
        }}>
            {childArray[1]}
        </div>,
        <div key={2} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '3rem',
            backgroundColor: '#fff',
            color: '#fff'
        }}>
            {childArray[2]}
        </div>
    ]

    useEffect(() => {
        let isScrolling = false
        const handleWheel = (e: WheelEvent) => {
        if (isScrolling) return
        isScrolling = true
        if (e.deltaY > 0) setCurrent(prev => Math.min(prev + 1, sections.length - 1))
        else setCurrent(prev => Math.max(prev - 1, 0))
        setTimeout(() => { isScrolling = false }, 800)
        }

        window.addEventListener('wheel', handleWheel)
        return () => window.removeEventListener('wheel', handleWheel)
    }, [sections.length])

    return (
        <>
            <PageWrapper /> 
            <div style={{ 
                width: '100vw',
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
        </>
    )
}

export default React.memo(MainContainer)