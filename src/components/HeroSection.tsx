import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import InteractiveEmu from './InteractiveEmu';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [titleText, setTitleText] = useState('Three Eyed Emu');
  const [subtitleText, setSubtitleText] = useState('Chase entertainment and innovation, with life enhancing big stick digital apps');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

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
          className="text-7xl font-black mb-6 text-glow cursor-text transition-all"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={() => setIsEditingTitle(true)}
          onBlur={(e) => {
            setIsEditingTitle(false);
            setTitleText(e.currentTarget.textContent || '');
          }}
          style={{
            background: isEditingTitle 
              ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--foreground)))' 
              : 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--primary)))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            outline: 'none',
            borderBottom: isEditingTitle ? '2px solid hsl(var(--primary) / 0.5)' : '2px solid transparent',
            paddingBottom: '4px'
          }}
        >
          {titleText}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl text-muted-foreground leading-relaxed cursor-text transition-all"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onFocus={() => setIsEditingSubtitle(true)}
          onBlur={(e) => {
            setIsEditingSubtitle(false);
            setSubtitleText(e.currentTarget.textContent || '');
          }}
          style={{
            outline: 'none',
            borderBottom: isEditingSubtitle ? '2px solid hsl(var(--primary) / 0.3)' : '2px solid transparent',
            paddingBottom: '2px'
          }}
        >
          {subtitleText}
        </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;