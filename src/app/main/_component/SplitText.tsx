import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import fontSize from "@/app/_global/styles/fontsize";

const { extra, mainPageSize } = fontSize 

const StyledH1 = styled.h1`
    color: #fff;
    font-size: ${mainPageSize};
    margin: 0 0 0 35px;
    padding: 0;
`

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: { opacity: number; y: number };
  to?: { opacity: number; y: number };
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  currentSection?: number;      // 부모에서 전달
  sectionIndex?: number;        // 이 SplitText가 속한 섹션
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = "",
    delay = 100,
    startDelay = 0,
    duration = 0.6,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    tag = "p",
    textAlign = "center",
    currentSection,
    sectionIndex,
    onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false);

  useEffect(() => {
    if (
      ref.current &&
      currentSection !== undefined &&
      sectionIndex !== undefined &&
      currentSection === sectionIndex 
    ) {
      const el = ref.current;

      // SplitText 없이 간단히 chars 단위 stagger 처리
      const letters = el.textContent?.split("") || [];
      el.textContent = ""; // 기존 텍스트 제거

      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.display = "inline-block";
        el.appendChild(span);
      });

      const spans = Array.from(el.querySelectorAll("span"));
      gsap.fromTo(
        spans,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          delay: startDelay || 0,
          onComplete: () => {
            animationCompletedRef.current = true;
            onLetterAnimationComplete?.();
          },
        }
      );
    }
  }, [currentSection, sectionIndex, from, to, duration, delay, ease, onLetterAnimationComplete]);

  const style: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };
  const classes = `split-parent ${className}`;

  switch (tag) {
    case "h1":
      return <StyledH1 ref={ref} style={style} className={classes}>{text}</StyledH1>
    case "h2":
      return <h2 ref={ref} style={style} className={classes}>{text}</h2>;
    case "h3":
      return <h3 ref={ref} style={style} className={classes}>{text}</h3>;
    case "h4":
      return <h4 ref={ref} style={style} className={classes}>{text}</h4>;
    case "h5":
      return <h5 ref={ref} style={style} className={classes}>{text}</h5>;
    case "h6":
      return <h6 ref={ref} style={style} className={classes}>{text}</h6>;
    default:
      return <p ref={ref} style={style} className={classes}>{text}</p>;
  }
};

export default React.memo(SplitText);
