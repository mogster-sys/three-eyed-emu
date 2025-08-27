import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const InteractiveEmu = () => {
  const emuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentState, setCurrentState] = useState<'away' | 'user'>('away');
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-transition animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      handleEmuInteraction();
    }, 3000); // Auto-animate after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Floating animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }
  }, []);

  const handleEmuInteraction = () => {
    if (isAnimating || !emuRef.current) return;
    
    setIsAnimating(true);
    
    // Create smooth transition animation
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentState(prev => prev === 'away' ? 'user' : 'away');
        setIsAnimating(false);
      }
    });

    // Simple scale and rotation animation
    tl.to(emuRef.current, {
      scale: 0.9,
      rotation: 5,
      duration: 0.2,
      ease: "power2.out"
    })
    .to(emuRef.current, {
      scale: 1.05,
      rotation: -3,
      duration: 0.2,
      ease: "power2.inOut"
    })
    .to(emuRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)"
    });

    // Add sparkle effects
    createSparkleEffect();
  };

  const createSparkleEffect = () => {
    if (!containerRef.current) return;
    
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute w-2 h-2 bg-primary rounded-full pointer-events-none';
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      containerRef.current.appendChild(sparkle);

      gsap.set(sparkle, {
        x: -4,
        y: -4,
        scale: 0
      });

      gsap.to(sparkle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        scale: 1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: i * 0.1,
        onComplete: () => {
          sparkle.remove();
        }
      });
    }
  };

  const handleHover = () => {
    if (isAnimating || !emuRef.current) return;
    
    gsap.to(emuRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleHoverEnd = () => {
    if (isAnimating || !emuRef.current) return;
    
    gsap.to(emuRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative z-20 pointer-events-none"
    >
      <div 
        ref={emuRef}
        className="relative w-64 h-64 lg:w-80 lg:h-80 pointer-events-auto cursor-pointer"
        onClick={handleEmuInteraction}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
      >
        <img
          src={currentState === 'user' ? '/lovable-uploads/738b7601-972b-4883-a6fa-43cf124d1ee5.png' : '/lovable-uploads/8e2e770a-b838-4805-a890-074355e1a349.png'}
          alt="Three Eyed Emu Mascot"
          className="w-full h-full object-contain"
          style={{
            // Multiple techniques for background removal
            filter: `
              drop-shadow(0 4px 6px rgba(0,0,0,0.1))
              drop-shadow(0 10px 15px rgba(0,0,0,0.1))
              drop-shadow(0 20px 25px rgba(0,0,0,0.05))
              drop-shadow(0 0 20px hsl(var(--primary) / 0.2))
            `,
            // This helps with removing white/light backgrounds
            mixBlendMode: 'darken',
            // Ensure image stands out from background
            isolation: 'isolate',
            // Slight color adjustments to help with background removal
            WebkitFilter: 'contrast(1.2) brightness(0.98)',
          }}
        />
        
        {/* Additional background removal layer using CSS filters */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.01) 70%)',
            mixBlendMode: 'multiply',
          }}
        />
        
        {/* Subtle glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-15 pointer-events-none"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)`,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
      </div>
      

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveEmu;