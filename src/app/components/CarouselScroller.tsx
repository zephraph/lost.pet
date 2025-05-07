"use client";

import { useEffect, useRef } from 'react';
import '../styles/mask.css';

export function CarouselScroller({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateMask = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

    container.style.setProperty('--mask-start-opacity', isAtStart ? '1' : '0');
    container.style.setProperty('--mask-end-opacity', isAtEnd ? '1' : '0');
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateMask();
    container.addEventListener('scroll', updateMask);
    return () => container.removeEventListener('scroll', updateMask);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mask-horizontal px-8"
    >
      {children}
    </div>
  );
}
