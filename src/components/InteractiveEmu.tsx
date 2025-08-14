import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// Using the correct paths to the uploaded images
const emuLooksAtUser = "/lovable-uploads/738b7601-972b-4883-a6fa-43cf124d1ee5.png";
const emuLooksAway = "/lovable-uploads/8e2e770a-b838-4805-a890-074355e1a349.png";

console.log("InteractiveEmu component loaded", { emuLooksAtUser, emuLooksAway });

const InteractiveEmu = () => {
  const emuRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initial animation on page load - emu looks at title
    const tl = gsap.timeline({ delay: 1 });
    
    tl.fromTo(emuRef.current, 
      { 
        opacity: 0, 
        x: -100,
        scale: 0.8
      },
      { 
        opacity: 1, 
        x: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && !isAnimating) {
        setIsAnimating(true);
        
        // Animate transition from "looks away" to "looks at user"
        const tl = gsap.timeline({
          onComplete: () => {
            setHasInteracted(true);
            setIsAnimating(false);
          }
        });

        // Scale and rotate slightly during transition
        tl.to(emuRef.current, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(emuRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      }
    };

    // Listen for any user interaction
    const events = ['click', 'scroll', 'mousemove', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [hasInteracted, isAnimating]);

  return (
    <div className="relative z-20 pointer-events-none">
      <div 
        ref={emuRef}
        className="relative w-64 h-64 lg:w-80 lg:h-80 transition-all duration-300 hover-scale cursor-pointer pointer-events-auto"
        onClick={() => {
          if (!isAnimating) {
            // Fun interaction - add a little bounce
            gsap.to(emuRef.current, {
              scale: 1.15,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.out"
            });
          }
        }}
      >
        <img
          src={hasInteracted ? emuLooksAtUser : emuLooksAway}
          alt="Three Eyed Emu Mascot"
          className="w-full h-full object-contain filter drop-shadow-2xl animate-fade-in"
          style={{
            filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.3))'
          }}
        />
        
        {/* Enhanced glow effect with multiple layers */}
        <div 
          className="absolute inset-0 -z-10 rounded-full pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
          }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 -z-20 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveEmu;