import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useCreatePurchase } from '@/hooks/usePurchases'
import { useToast } from '@/hooks/use-toast'
import { CreditCard, Lock } from 'lucide-react'

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ open, onOpenChange }) => {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const createPurchase = useCreatePurchase()
  const { toast } = useToast()
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  })
  const [loading, setLoading] = useState(false)

  const totalPrice = getTotalPrice()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    
    try {
      // In a real implementation, you'd integrate with Stripe here
      // For now, we'll simulate the payment process
      
      // Create purchases for each item
      for (const item of items) {
        await createPurchase.mutateAsync({
          user_id: user.id,
          app_id: item.app.id,
          amount: item.app.price * item.quantity,
          status: 'completed',
          stripe_payment_id: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        })
      }

      // Clear cart and close dialog
      clearCart()
      onOpenChange(false)
      
      toast({
        title: "Purchase Successful!",
        description: `You've successfully purchased ${items.length} app(s) for $${totalPrice.toFixed(2)}.`,
      })
      
      // Reset payment form
      setPaymentData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
      })
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Secure Checkout
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-semibold">Order Summary</h3>
            {items.map((item) => (
              <div key={item.app.id} className="flex justify-between text-sm">
                <span>{item.app.name} × {item.quantity}</span>
                <span>${(item.app.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardName: e.target.value }))}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}