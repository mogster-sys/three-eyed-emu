import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const themes = [
  { name: 'Cosmic Blue', class: '', color: 'hsl(217, 91%, 60%)' },
  { name: 'Sunset Orange', class: 'theme-sunset', color: 'hsl(25, 95%, 53%)' },
  { name: 'Neon Green', class: 'theme-neon-green', color: 'hsl(120, 84%, 60%)' },
  { name: 'Ocean Depths', class: 'theme-ocean', color: 'hsl(195, 100%, 50%)' }
];

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const switchTheme = (index: number) => {
    const theme = themes[index];
    
    // Remove all theme classes
    document.body.classList.remove(...themes.map(t => t.class).filter(Boolean));
    
    // Add new theme class if not default
    if (theme.class) {
      document.body.classList.add(theme.class);
    }
    
    setCurrentTheme(index);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="relative">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="icon"
          className="glassmorphic glow-effect"
        >
          <Palette className="h-4 w-4" />
        </Button>

        {isOpen && (
          <div className="absolute top-12 right-0 glassmorphic rounded-lg p-3 space-y-2 min-w-48">
            <p className="text-sm font-medium mb-2">Choose Theme</p>
            {themes.map((theme, index) => (
              <button
                key={theme.name}
                onClick={() => switchTheme(index)}
                className={`flex items-center gap-3 w-full p-2 rounded-md text-left transition-all hover:bg-muted ${
                  currentTheme === index ? 'bg-primary/20 border border-primary/30' : ''
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-sm">{theme.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;