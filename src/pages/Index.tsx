import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import InteractiveEmu from '@/components/InteractiveEmu';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/HeroSection';
import AppPortfolio from '@/components/AppPortfolio';
import { MarketplacePortfolio } from '@/components/MarketplacePortfolio';
import { CartSheet } from '@/components/CartSheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { AuthDialog } from '@/components/AuthDialog';
import { User, LogOut } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, profile, signOut, loading, isSupabaseAvailable } = useAuth();

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
      {/* Navigation Bar */}
      <nav className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
        <CartSheet />
        {!isSupabaseAvailable && (
          <Badge variant="outline" className="hidden sm:inline-flex">Preview mode</Badge>
        )}
        
        {!loading && (
          <>
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {profile?.full_name || user.email}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={signOut}
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAuthDialogOpen(true)}
              >
                Sign In
              </Button>
            )}
          </>
        )}
      </nav>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* App Portfolio */}
      <AppPortfolio />
      
      {/* Marketplace Portfolio */}
      <MarketplacePortfolio />
      
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default Index;
