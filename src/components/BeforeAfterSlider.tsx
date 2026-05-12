import { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
}

export const BeforeAfterSlider = ({ before, after, alt }: BeforeAfterSliderProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calcPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) calcPosition(e.clientX);
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) calcPosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-ew-resize select-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full background) */}
      <img
        src={after}
        alt={`${alt} - after`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={before}
          alt={`${alt} - before`}
          className="absolute inset-0 h-full object-cover"
          style={{
            width: `${100 / (sliderPos / 100)}%`,
            maxWidth: 'none',
          }}
          draggable={false}
        />
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/70 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/30 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">
          <MoveHorizontal className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-background/40 backdrop-blur-sm text-[0.6rem] font-semibold uppercase tracking-wider text-white pointer-events-none">
        Before
      </div>
      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-background/40 backdrop-blur-sm text-[0.6rem] font-semibold uppercase tracking-wider text-white pointer-events-none">
        After
      </div>
    </div>
  );
};
