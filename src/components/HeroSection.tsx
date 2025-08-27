import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import InteractiveEmu from './InteractiveEmu';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [titleText] = useState('Three Eyed Emu');
  const [subtitleText] = useState('Chase innovation and entertainment, with life enhancing big stick digital apps');

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 30
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, 
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-8 relative">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)'
        }}
      />
      
      <div className="flex items-center gap-8 lg:gap-16 z-10 max-w-6xl w-full">
        {/* Emu Mascot */}
        <div className="flex-shrink-0">
          <InteractiveEmu />
        </div>
        
        <div className="text-left flex-1">
        <h1 
          ref={titleRef}
          className="text-7xl font-black mb-6 text-glow transition-all"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--primary)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {titleText}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl text-muted-foreground leading-relaxed transition-all"
        >
          {subtitleText}
        </p>
        
        {/* Scroll indicator */}
        <div className="flex flex-col items-start mt-8 gap-4 w-full relative">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <img 
            src="/emu-foot.svg" 
            alt="Emu foot pointing down"
            className="opacity-70"
            style={{
              animation: 'gentle-bounce 3s ease-in-out infinite',
              objectFit: 'contain',
              width: '500px',
              height: '250px',
              marginLeft: '-50px',
              transform: 'translateX(50px)'
            }}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;