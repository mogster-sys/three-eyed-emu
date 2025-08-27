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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editableTitle, setEditableTitle] = useState(app.name);
  const [editableDescription, setEditableDescription] = useState(app.fullDescription);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  
  const appStatus = getAppStatus(app.id);
  const isNotReady = appStatus !== 'ready';

  useEffect(() => {
    // Disabled GSAP hover animations to prevent twitching/jumping
    // All hover effects are now handled via stable CSS transitions.
  }, [isHovered, dialogOpen]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    // Consider images with aspect ratio between 0.8 and 1.2 as square-ish
    setIsSquareImage(aspectRatio >= 0.8 && aspectRatio <= 1.2);
  };

  return (
    <>
      <div
        ref={cardRef}
        className="relative w-full h-64 glassmorphic rounded-xl overflow-hidden glow-effect group"
      >
      <div className="flex h-full">
        {/* Left side - Image */}
        <div className="w-1/2 h-full relative overflow-hidden bg-secondary/30">
          {/* Image Container */}
          <div className="absolute inset-0 overflow-hidden bg-secondary/30">
            <img 
              src={app.sourceImage} 
              alt={app.name}
              className={`${
                isSquareImage 
                  ? 'w-full h-full object-contain' 
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
        <div className="w-1/2 p-6 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="mb-3">
              <h3 className="font-bold text-xl leading-tight">{app.name}</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {app.description}
            </p>

            {/* Buttons Container - Centered */}
            <div className="flex-1 flex flex-col justify-center gap-2">
              <Dialog onOpenChange={(open) => setDialogOpen(open)}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-xs py-1.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto glassmorphic border-primary/20 glow-effect">
                  <DialogHeader className="border-b border-primary/20 pb-4 mb-6">
                    <DialogTitle 
                      className="text-2xl font-bold text-glow cursor-text transition-all"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onFocus={() => setIsEditingTitle(true)}
                      onBlur={(e) => {
                        setIsEditingTitle(false);
                        setEditableTitle(e.currentTarget.textContent || '');
                      }}
                      style={{
                        outline: 'none',
                        borderBottom: isEditingTitle ? '2px solid hsl(var(--primary) / 0.5)' : '2px solid transparent',
                        paddingBottom: '2px'
                      }}
                    >
                      {editableTitle}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Badge variant="secondary" className="w-fit bg-primary/20 text-primary border-primary/30 glow-effect">
                      {app.category}
                    </Badge>
                    <p 
                      className="text-muted-foreground leading-relaxed text-base cursor-text transition-all"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onFocus={() => setIsEditingDescription(true)}
                      onBlur={(e) => {
                        setIsEditingDescription(false);
                        setEditableDescription(e.currentTarget.textContent || '');
                      }}
                      style={{
                        outline: 'none',
                        borderLeft: isEditingDescription ? '3px solid hsl(var(--primary) / 0.3)' : '3px solid transparent',
                        paddingLeft: isEditingDescription ? '12px' : '0px',
                        marginLeft: isEditingDescription ? '-12px' : '0px'
                      }}
                    >
                      {editableDescription}
                    </p>
                    <div className="space-y-3 bg-card/50 p-4 rounded-lg border border-primary/10">
                      <h4 className="font-semibold text-primary text-glow">Features:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {app.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary text-xs mt-1">▶</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Get App button */}
              {isNotReady ? (
                <Button 
                  size="sm" 
                  className="w-full text-xs py-1.5 glow-effect transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowContactForm(true);
                  }}
                >
                  Get App
                </Button>
              ) : (
                <Dialog onOpenChange={(open) => setDialogOpen(open)}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="w-full text-xs py-1.5 glow-effect transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get App
                    </Button>
                  </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glassmorphic border-primary/20 glow-effect">
                  <DialogHeader className="border-b border-primary/20 pb-4 mb-6">
                    <DialogTitle 
                      className="text-3xl font-bold text-glow bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent cursor-text transition-all"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onFocus={() => setIsEditingTitle(true)}
                      onBlur={(e) => {
                        setIsEditingTitle(false);
                        const text = e.currentTarget.textContent || '';
                        setEditableTitle(text.replace(' - Get Started', ''));
                      }}
                      style={{
                        outline: 'none',
                        borderBottom: isEditingTitle ? '2px solid hsl(var(--primary) / 0.5)' : '2px solid transparent',
                        paddingBottom: '2px'
                      }}
                    >
                      {editableTitle} - Get Started
                    </DialogTitle>
                  </DialogHeader>
                  <div className="bg-card/30 rounded-lg p-1 border border-primary/10">
                    <AppCommerce app={app} />
                  </div>
                </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

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