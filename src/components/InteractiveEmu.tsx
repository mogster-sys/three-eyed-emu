import { useRef, useState } from 'react';
// Using the correct paths to the uploaded images
const emuLooksAtUser = "/lovable-uploads/738b7601-972b-4883-a6fa-43cf124d1ee5.png";
const emuLooksAway = "/lovable-uploads/8e2e770a-b838-4805-a890-074355e1a349.png";

console.log("InteractiveEmu component loaded", { emuLooksAtUser, emuLooksAway });

const InteractiveEmu = () => {
  const emuRef = useRef<HTMLDivElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);



  return (
    <div className="relative z-20 pointer-events-none">
      <div 
        ref={emuRef}
        className="relative w-64 h-64 lg:w-80 lg:h-80 pointer-events-auto">
        <img
          src={hasInteracted ? emuLooksAtUser : emuLooksAway}
          alt="Three Eyed Emu Mascot"
          className="w-full h-full object-contain filter drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.3))'
          }}
        />
        
      </div>
    </div>
  );
};

export default InteractiveEmu;