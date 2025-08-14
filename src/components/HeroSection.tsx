import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

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
    <div className="min-h-screen flex items-center justify-end pr-16 relative">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center right, hsl(var(--primary) / 0.2) 0%, transparent 70%)'
        }}
      />
      
      <div className="text-right z-10 max-w-2xl">
        <h1 
          ref={titleRef}
          className="text-7xl font-black mb-6 text-glow"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--primary)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Three Eyed Emu
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          Discover extraordinary apps and digital experiences.
          <br />
          Your gateway to innovation and creativity.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;