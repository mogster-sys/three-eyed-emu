import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { gsap } from 'gsap';
import { AppData } from '@/data/apps';
import { AppCommerce } from '@/components/AppCommerce';
import { AppStatusBadge } from '@/components/AppStatusBadge';
import { ContactFormDialog } from '@/components/ContactFormDialog';
import { getAppStatus } from '@/data/appStatus';

interface AppCardProps {
  app: AppData;
}

const AppCard = ({ app }: AppCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSquareImage, setIsSquareImage] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  const appStatus = getAppStatus(app.id);
  const isNotReady = appStatus !== 'ready';

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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    // Consider images with aspect ratio between 0.8 and 1.2 as square-ish
    setIsSquareImage(aspectRatio >= 0.8 && aspectRatio <= 1.2);
  };

  const handleCardClick = () => {
    if (isNotReady) {
      setShowContactForm(true);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-full h-64 project-card overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
      <div className="flex h-full">
        {/* Left side - Image and Learn More Button */}
        <div className="w-1/2 h-full relative overflow-hidden flex flex-col bg-secondary/30">
          {/* Image Container */}
          <div className={`relative overflow-hidden bg-secondary/30 ${isSquareImage ? 'flex-1 flex items-start pt-4' : 'absolute inset-0'}`}>
            <img 
              src={app.sourceImage} 
              alt={app.name}
              className={`transition-transform duration-500 group-hover:scale-110 ${
                isSquareImage 
                  ? 'w-full h-auto max-h-full object-contain' 
                  : 'w-full h-full object-cover'
              }`}
              onLoad={handleImageLoad}
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="250" fill="hsl(var(--muted))"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="hsl(var(--muted-foreground))" font-size="24">${app.name}</text>
                  </svg>
                `)}`;
              }}
            />
            
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20" />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-xl leading-tight pr-2">{app.name}</h3>
              <div className="flex flex-col gap-1 shrink-0">
                <Badge variant="secondary" className="text-xs">
                  {app.category}
                </Badge>
                <AppStatusBadge status={appStatus} />
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {app.description}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Status watermark overlay */}
      {isNotReady && (
        <div className="absolute top-3 left-3 z-20">
          <AppStatusBadge status={appStatus} className="backdrop-blur-sm" />
        </div>
      )}
    </div>

    <ContactFormDialog 
      open={showContactForm}
      onOpenChange={setShowContactForm}
      appName={app.name}
      appId={app.id}
    />
  </>
  );
};

export default AppCard;