import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AppData } from '@/data/apps';
import { Check, Smartphone, Monitor, CreditCard, Download } from 'lucide-react';
import { CheckoutDialog } from '@/components/CheckoutDialog';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface AppCommerceProps {
  app: AppData;
}

export const AppCommerce = ({ app }: AppCommerceProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('basic');
  const [showCheckout, setShowCheckout] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Pricing tiers
  const pricingPlans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: '$4.99',
      period: 'one-time',
      description: 'Essential features for personal use',
      features: [
        'Core functionality',
        'Mobile app access',
        'Basic support',
        'Single device license'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '$9.99',
      period: 'monthly',
      description: 'Advanced features for power users',
      features: [
        'All Basic features',
        'Premium functionality',
        'Cross-platform sync',
        'Priority support',
        'Multiple device license',
        'Advanced analytics'
      ],
      popular: true
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: '$24.99',
      period: 'monthly',
      description: 'Full-featured solution for teams',
      features: [
        'All Premium features',
        'Team collaboration',
        'Custom integrations',
        'Dedicated support',
        'Unlimited devices',
        'Admin dashboard',
        'API access'
      ]
    }
  ];

  const handlePurchase = (planId: string) => {
    // Find the selected plan details
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return;
    
    // Extract price as number (remove $ and convert)
    const price = parseFloat(plan.price.replace('$', ''));
    
    // Add the app to cart with the selected plan price
    const appWithPrice = { ...app, price };
    addItem(appWithPrice);
    
    // Show success message
    toast({
      title: "Added to Cart",
      description: `${app.name} (${plan.name} plan) has been added to your cart.`,
    });
    
    // Open the checkout dialog
    setShowCheckout(true);
  };

  const handleAppStoreRedirect = (platform: 'ios' | 'android' | 'direct') => {
    if (platform === 'direct') {
      // For direct download, trigger the purchase flow
      // This will use Stripe payment and then provide download link
      handlePurchase(selectedPlan);
      return;
    }
    
    // For app stores, redirect to their pages
    const urls = {
      ios: `https://apps.apple.com/search?term=${encodeURIComponent(app.name)}`,
      android: `https://play.google.com/store/search?q=${encodeURIComponent(app.name)}`,
    };
    
    window.open(urls[platform], '_blank');
  };

  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{app.name}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {app.description}
        </p>
        <Badge variant="secondary" className="text-sm">
          {app.category}
        </Badge>
      </div>

      <Separator />

      {/* Platform Downloads */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Download & Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => handleAppStoreRedirect('ios')}>
            <CardContent className="p-4 text-center">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">iOS App Store</h4>
              <p className="text-sm text-muted-foreground">iPhone & iPad</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleAppStoreRedirect('android')}>
            <CardContent className="p-4 text-center">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Google Play</h4>
              <p className="text-sm text-muted-foreground">Android devices</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors border-primary/30 bg-primary/5"
                onClick={() => handleAppStoreRedirect('direct')}>
            <CardContent className="p-4 text-center">
              <Download className="h-8 w-8 mx-auto mb-2 text-primary animate-pulse" />
              <h4 className="font-medium">Direct Download</h4>
              <p className="text-sm text-muted-foreground">Purchase & Download</p>
              <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                Secure Payment
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Pricing Plans */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Choose Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-primary' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full mt-6" 
                  variant={selectedPlan === plan.id ? 'default' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(plan.id);
                  }}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {plan.period === 'one-time' ? 'Buy Now' : 'Subscribe'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">What's Included</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Cross-platform compatibility</li>
          <li>• Regular updates and new features</li>
          <li>• Customer support</li>
          <li>• 30-day money-back guarantee</li>
          <li>• Secure payment processing via Stripe</li>
        </ul>
      </div>
      
      {/* Checkout Dialog */}
      <CheckoutDialog 
        open={showCheckout}
        onOpenChange={setShowCheckout}
      />
    </div>
  );
};