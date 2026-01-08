
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

export default function CartPage({ cart, updateQuantity, removeItem }: { cart: CartItem[], updateQuantity: any, removeItem: any }) {
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const shipping = subtotal > 250 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-8 py-32 text-center animate-in fade-in duration-500">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-6">Your Bag is Empty</h1>
        <p className="text-gray-500 mb-12 max-w-md mx-auto">Explore our premium collections and find the perfect carry companion for your journey.</p>
        <Link to="/products" className="inline-block px-12 py-4 bg-[#333333] text-white uppercase text-sm font-bold tracking-widest hover:bg-[#444444] transition-all">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-12 animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold uppercase tracking-widest mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="hidden md:grid grid-cols-6 text-xs font-bold uppercase tracking-widest text-gray-400 pb-4 border-b border-gray-100">
            <div className="col-span-3">Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
            <div className="text-right"></div>
          </div>
          
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedColor}`} className="grid grid-cols-1 md:grid-cols-6 items-center gap-6 pb-8 border-b border-gray-100">
              <div className="md:col-span-3 flex space-x-6">
                <div className="w-24 h-32 flex-shrink-0 bg-gray-50 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                  <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">{item.category}</p>
                  <p className="text-sm font-medium mt-2 md:hidden">Price: ${item.price}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => updateQuantity(item.id, item.selectedColor, -1)} className="p-2 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.selectedColor, 1)} className="p-2 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="text-right hidden md:block">
                <span className="font-bold text-lg">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
              
              <div className="text-right">
                <button onClick={() => removeItem(item.id, item.selectedColor)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <Link to="/products" className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#333333] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-[#F9F9F9] p-8 space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-bold">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Tax</span>
                <span className="font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="block w-full bg-[#333333] text-white text-center py-5 uppercase text-sm font-bold tracking-widest hover:bg-[#444444] transition-all">
              Proceed to Checkout
            </Link>
            
            <div className="space-y-4 pt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Secured Checkout</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Complimentary Shipping over $250</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
                <span>30-Day Effortless Returns</span>
              </div>
            </div>
          </div>

          <div className="p-8 border border-gray-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest">Add a promo code</h3>
            <div className="flex space-x-2">
              <input type="text" placeholder="CODE" className="flex-1 bg-white border border-gray-200 px-4 py-2 outline-none focus:border-[#D4AF37]" />
              <button className="px-6 py-2 bg-[#333333] text-white uppercase text-xs font-bold tracking-widest">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
