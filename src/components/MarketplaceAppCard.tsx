import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { AuthDialog } from '@/components/AuthDialog';
import { Database } from '@/lib/types';
import { ShoppingCart, Star } from 'lucide-react';

type App = Database['public']['Tables']['apps']['Row'];

interface MarketplaceAppCardProps {
  app: App;
}

export const MarketplaceAppCard = ({ app }: MarketplaceAppCardProps) => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }
    addItem(app);
  };

  const features = Array.isArray(app.features) ? app.features : [];
  const screenshots = Array.isArray(app.screenshots) ? app.screenshots : [];

  return (
    <>
      <Card className="group h-full glassmorphic glow-effect hover:scale-105 transition-all duration-300">
        <CardContent className="p-0">
          {/* Featured Badge */}
          {app.featured && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="secondary" className="bg-primary/90 text-white">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          {/* App Image */}
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            {app.thumbnail_url ? (
              <img
                src={app.thumbnail_url}
                alt={app.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/60">{app.name.charAt(0)}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* App Content */}
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-xl text-glow">{app.name}</h3>
              {app.short_description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {app.short_description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {app.price === 0 ? 'Free' : `$${app.price.toFixed(2)}`}
              </div>
              {features.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {features.length} features
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{app.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {app.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                    )}
                    
                    {features.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Features</h4>
                        <ul className="space-y-2">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-primary mt-1">▶</span>
                              {typeof feature === 'string' ? feature : JSON.stringify(feature)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {screenshots.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Screenshots</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {screenshots.slice(0, 4).map((screenshot, index) => (
                            <img
                              key={index}
                              src={screenshot as string}
                              alt={`${app.name} screenshot ${index + 1}`}
                              className="rounded-lg border aspect-video object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-2xl font-bold text-primary">
                        {app.price === 0 ? 'Free' : `$${app.price.toFixed(2)}`}
                      </div>
                      <Button onClick={handleAddToCart} className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button onClick={handleAddToCart} className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                {app.price === 0 ? 'Get Free' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
};