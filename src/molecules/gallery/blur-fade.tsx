'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export function BlurFade({
  children,
  className = '',
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = 'down',
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || inView === true) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: inViewMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [inView, inViewMargin]);

  // Determine transform property based on direction
  const getInitialTransform = () => {
    const value = `${offset}px`;
    switch (direction) {
      case 'up':
        return `translateY(${value})`;
      case 'down':
        return `translateY(-${value})`;
      case 'left':
        return `translateX(${value})`;
      case 'right':
        return `translateX(-${value})`;
      default:
        return `translateY(-${value})`;
    }
  };

  // Create dynamic styles
  const style = {
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : `blur(${blur})`,
    transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
    transition: `opacity ${duration}s ease-out, filter ${duration}s ease-out, transform ${duration}s ease-out`,
    transitionDelay: `${0.04 + delay}s`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
