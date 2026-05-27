import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const InteractiveMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.04, 0.07, 0.16],
      markerColor: [0.77, 0.63, 0.35],
      glowColor: [0.04, 0.07, 0.16],
      markers: [],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    canvasRef.current!.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    if (pointerInteracting.current !== null) {
      phiRef.current += pointerInteractionMovement.current;
      pointerInteractionMovement.current = 0;
    }
    pointerInteracting.current = null;
    canvasRef.current!.style.cursor = 'grab';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta / 200;
    }
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto aspect-square flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{ width: '100%', height: '100%' }}
        className="cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default InteractiveMap;
