import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName: string;
  appId: string;
}

export const ContactFormDialog = ({ open, onOpenChange, appName, appId }: ContactFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store locally for now (console log for debugging)
      console.log('Contact submission for:', appName, {
        app_id: appId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Thank you for your interest!",
        description: "We'll be in touch soon regarding " + appName,
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md glassmorphic border-primary/20 glow-effect">
        <DialogHeader className="border-b border-primary/20 pb-4 mb-6">
          <DialogTitle className="text-xl font-bold text-glow">Get Notified About {appName}</DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            This app is still in development. Leave your details and we'll contact you when it's ready!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary font-medium">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="glassmorphic border-primary/20 focus:border-primary/40 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary font-medium">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="glassmorphic border-primary/20 focus:border-primary/40 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-primary font-medium">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="glassmorphic border-primary/20 focus:border-primary/40 focus:ring-primary/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-primary font-medium">Message (optional)</Label>
            <Textarea
              id="message"
              placeholder="Any specific features you're excited about?"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="glassmorphic border-primary/20 focus:border-primary/40 focus:ring-primary/20 resize-none"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 glassmorphic border-primary/20 hover:border-primary/40 hover:bg-primary/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 glow-effect bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
            >
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};