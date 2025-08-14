import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { AppData } from '@/data/apps';

interface AppCardProps {
  app: AppData;
}

const AppCard = ({ app }: AppCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    const icon = iconRef.current;
    
    if (!card || !content || !icon) return;

    if (isHovered) {
      const tl = gsap.timeline();
      
      // Lift and expand card
      tl.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Fade out icon, fade in content
      tl.to(icon, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2
      }, 0.1)
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, 0.2);
      
    } else {
      const tl = gsap.timeline();
      
      // Fade out content, fade in icon
      tl.to(content, {
        opacity: 0,
        y: 20,
        duration: 0.2
      })
      .to(icon, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      }, 0.1)
      .to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, 0);
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="relative w-full aspect-square glassmorphic rounded-xl overflow-hidden cursor-pointer glow-effect"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Unified Icon State */}
      <div 
        ref={iconRef}
        className="absolute inset-0 flex items-center justify-center p-6"
      >
        <div className="w-24 h-24 rounded-xl glassmorphic flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              {app.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Content State */}
      <div 
        ref={contentRef}
        className="absolute inset-0 p-6 flex flex-col opacity-0"
        style={{ transform: 'translateY(20px)' }}
      >
        {/* Full Source Image */}
        <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
          <img 
            src={app.sourceImage} 
            alt={app.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="120" fill="hsl(var(--muted))"/>
                  <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="hsl(var(--muted-foreground))">${app.name}</text>
                </svg>
              `)}`;
            }}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg leading-tight">{app.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {app.category}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {app.description}
          </p>

          {/* Screenshot Placeholders */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="aspect-video bg-muted rounded flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground text-center">
                  Screenshot {i}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto">
            <Button size="sm" className="glow-effect">
              Get App
            </Button>
            <Button size="sm" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCard;