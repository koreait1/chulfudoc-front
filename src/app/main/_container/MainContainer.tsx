'use client'
import React from "react"
import { PageWrapper, PageMain } from "../_component/StyleWrapper"
import GradientText from "../_component/GradientText"
import { useState, useEffect } from "react"

const MainContainer = ({ children }: {children: React.ReactNode}) => {
    const [current, setCurrent] = useState(0)

    const sections = [
        <div key={0}>
            <PageMain>
                <span className="line_start">SAFETY</span>
                <GradientText className="highlight">WHERE</GradientText>
                <span className="line_end">YOU aRE</span>
            </PageMain>
            {Array.isArray(children) ? children[0] : [children]}
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
            {Array.isArray(children) ? children[1] : [children]}
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
                width: '100vw',  // 화면 전체 너비
                height: '100vh', // 화면 전체 높이
                overflow: 'hidden',
                margin: 0,       // 상위 margin 무시
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