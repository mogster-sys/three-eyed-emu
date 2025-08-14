import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import InteractiveEmu from '@/components/InteractiveEmu';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import AppPortfolio from '@/components/AppPortfolio';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-deep to-background">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Interactive Emu Mascot */}
      <InteractiveEmu />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* App Portfolio */}
      <AppPortfolio />
    </div>
  );
};

export default Index;
