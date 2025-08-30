import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

const StyledContent = styled.div`
    display: relative;
    height: 100%;
`

interface AnimatedContentProps {
  children: ReactNode;
  currentSection?: number;
  sectionIndex?: number;    
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  delay?: number;
  onComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  currentSection,
  sectionIndex,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  onComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || currentSection === undefined || sectionIndex === undefined) return;

    const el = ref.current;
    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;

    if (currentSection === sectionIndex) {
      gsap.set(el, { [axis]: offset, scale, opacity: animateOpacity ? initialOpacity : 1 });
      gsap.to(el, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        onComplete,
      });
    } else {
      gsap.set(el, { [axis]: offset, scale, opacity: animateOpacity ? initialOpacity : 1 });
    }
  }, [
    currentSection,
    sectionIndex,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    delay,
    onComplete,
  ]);

  return <StyledContent ref={ref}>{children}</StyledContent>;
};

export default React.memo(AnimatedContent);
