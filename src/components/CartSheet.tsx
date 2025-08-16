import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { AuthDialog } from './AuthDialog'
import { CheckoutDialog } from './CheckoutDialog'

export const CartSheet: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, getItemCount } = useCart()
  const { user } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      setAuthDialogOpen(true)
      return
    }
    setCheckoutDialogOpen(true)
  }

  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({itemCount} items)</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-full mt-6">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.app.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      {item.app.thumbnail_url && (
                        <img 
                          src={item.app.thumbnail_url} 
                          alt={item.app.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.app.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.app.short_description}
                        </p>
                        <p className="font-medium text-primary">
                          ${item.app.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.app.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.app.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(item.app.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                  >
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      <CheckoutDialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen} />
    </>
  )
}