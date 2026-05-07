import React, { useEffect, useRef } from 'react';

const HexagonGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let lastInteractionTime = Date.now();
    let isIdle = true;
    
    const updateCoords = (x, y) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      lastInteractionTime = Date.now();
      isIdle = false;
    };

    const handleMouseMove = (e) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Idle animation loop
    const animateIdle = () => {
      const now = Date.now();
      if (now - lastInteractionTime > 2000) {
        isIdle = true;
      }

      if (isIdle && containerRef.current) {
        const time = now / 2000;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.2;
        
        // Movimiento suave en forma de infinito (Lissajous curve)
        const x = centerX + Math.sin(time) * radius * 1.5;
        const y = centerY + Math.sin(time * 0.5) * radius;
        
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
      
      animationFrameId = requestAnimationFrame(animateIdle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    animateIdle();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        '--mouse-x': '50vw',
        '--mouse-y': '50vh',
      }}
    >
      {/* Definiciones comunes SVG para rendimiento */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <pattern 
            id="hex-pattern-base" 
            width="120" 
            height="69.282" 
            patternUnits="userSpaceOnUse" 
            patternTransform="scale(0.8)"
          >
            <path 
              d="M0 34.641h20l20-34.641h40l20 34.641h20M20 34.641l20 34.641M100 34.641l-20 34.641" 
              fill="none" 
              stroke="var(--hex-grid-color)" 
              strokeWidth="2" 
            />
          </pattern>
          <pattern 
            id="hex-pattern-glow" 
            width="120" 
            height="69.282" 
            patternUnits="userSpaceOnUse" 
            patternTransform="scale(0.8)"
          >
            <path 
              d="M0 34.641h20l20-34.641h40l20 34.641h20M20 34.641l20 34.641M100 34.641l-20 34.641" 
              fill="none" 
              stroke="var(--hex-grid-glow)" 
              strokeWidth="4" 
            />
          </pattern>
          
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Capa 1: Base Grid (Tenue, plana y pulsante) */}
      {/* Se usa máscara inversa para ocultar la capa base donde está el cursor y evitar doble visión */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          opacity: 'var(--hex-grid-opacity, 0.35)',
          maskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 80%, black 100%)',
          WebkitMaskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 80%, black 100%)',
          willChange: 'mask-image',
        }}
      >
        <svg 
          className="absolute inset-0 w-full h-full animate-hex-pulse" 
          style={{ animationDuration: '4s' }}
        >
          <rect width="100%" height="100%" fill="url(#hex-pattern-base)" mask="url(#grid-fade)" />
        </svg>
      </div>

      {/* Capa 2: Elevated & Glowing Grid (Interactiva al Mouse) */}
      {/* Se usa mask-image para mostrar esta capa SOLO cerca del cursor */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: 0.8, 
          maskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
          willChange: 'mask-image',
        }}
      >
        <svg 
          className="absolute inset-0 w-full h-full" 
          style={{ transform: 'scale(1.025)' }}
        >
          <rect width="100%" height="100%" fill="url(#hex-pattern-glow)" mask="url(#grid-fade)" />
        </svg>
      </div>
      
      {/* Resplandor sutil animado (Radial Gradient ambiental) */}
      <div 
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-40 animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--hex-grid-glow) 20%, transparent) 0%, transparent 60%)',
          animationDuration: '6s'
        }}
      />
    </div>
  );
};

export default HexagonGrid;
