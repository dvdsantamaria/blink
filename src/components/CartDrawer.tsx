import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import type { CartItem } from '@/types';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const handleCheckout = () => {
    // Stripe integration ready - just call your backend endpoint
    toast.info('Redirecting to checkout...', {
      description: 'Stripe integration ready - connect your backend endpoint',
    });
    
    // Example of how to integrate with Stripe:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items }),
    // });
    // const { url } = await response.json();
    // window.location.href = url;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Your Cart</SheetTitle>
            <SheetClose asChild>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Your cart is empty</h3>
          <p className="text-slate-500 mb-6 max-w-xs">
            Looks like you haven't added any blinds yet. Explore our collections!
          </p>
          <SheetClose asChild>
            <Button
              onClick={() => {
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-slate-900 hover:bg-slate-800"
            >
              Browse Products
            </Button>
          </SheetClose>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-lg font-semibold">
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </SheetTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCart}
              className="text-sm text-slate-500 hover:text-red-600 transition-colors"
            >
              Clear
            </button>
            <SheetClose asChild>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </SheetClose>
          </div>
        </div>
      </SheetHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-auto py-4">
        <div className="px-6 space-y-4">
          {items.map((item: CartItem) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}`}
              className="flex gap-4 p-3 bg-slate-50 rounded-lg"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">
                  {item.product.name}
                </h4>
                <p className="text-sm text-slate-500">
                  {item.size && `${item.size}`}
                  {item.size && item.color && ' • '}
                  {item.color && `${item.color}`}
                </p>
                <p className="font-medium text-slate-900 mt-1">
                  {formatPrice(item.product.price)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded hover:border-slate-300 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 rounded hover:border-slate-300 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-sm text-slate-500 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-slate-50 p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium">{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium text-slate-900">Total</span>
            <span className="font-semibold text-lg text-slate-900">
              {formatPrice(getTotalPrice())}
            </span>
          </div>
        </div>
        <Button
          onClick={handleCheckout}
          className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-base"
        >
          Checkout
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-center text-slate-500">
          Shipping & taxes calculated at checkout
        </p>
      </div>
    </div>
  );
}
