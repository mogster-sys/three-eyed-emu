import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        setProgress(Math.round(this.progress() * 100));
      }
    });

    // Pulse animation for logo
    gsap.to(".loading-logo", {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="loading-logo text-6xl font-bold text-glow mb-8">
          Three Eyed Emu
        </h1>
        
        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-4 text-muted-foreground">
          Loading... {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;