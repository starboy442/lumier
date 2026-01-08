
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

export default function Checkout({ cart }: { cart: CartItem[] }) {
  const [step, setStep] = useState(1);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal > 250 ? 0 : 25) + (subtotal * 0.08);

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen pt-48 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-black italic serif tracking-tighter mb-8">Your bag is empty.</h2>
        <Link to="/products" className="text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-black pb-2">Explore the Archive</Link>
      </div>
    );
  }

  const Success = () => (
    <div className="max-w-xl mx-auto text-center py-20 space-y-10 animate-in fade-in zoom-in duration-1000">
      <div className="inline-flex items-center justify-center w-32 h-32 bg-[#F8F7F4] text-[#D4AF37] rounded-full mb-4">
        <CheckCircle2 className="w-16 h-16" />
      </div>
      <div className="space-y-6">
        <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Order Finalized</span>
        <h1 className="text-5xl font-black uppercase tracking-tighter">Manifest Received.</h1>
        <p className="text-lg text-gray-500 font-light italic serif leading-relaxed">
          Your order #LM-82910 is being processed within our Parisian atelier. A digital manifest has been transmitted to your email.
        </p>
      </div>
      <div className="pt-12 space-y-6">
        <Link to="/" className="block w-full bg-black text-white py-6 uppercase text-[10px] font-black tracking-[0.6em] hover:bg-[#D4AF37] transition-all shadow-2xl">Return to Sanctuary</Link>
        <button className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors">Track Shipment Protocol</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-48 pb-32 animate-in fade-in duration-1000 bg-white">
      <div className="container mx-auto px-6">
        {step === 3 ? (
          <Success />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            <div className="lg:col-span-7 space-y-16">
              <div className="flex flex-col space-y-8">
                <nav className="flex items-center space-x-6 text-[9px] font-black uppercase tracking-[0.4em]">
                  <span className={step >= 1 ? 'text-black' : 'text-gray-300'}>01. Logistics</span>
                  <div className="w-8 h-[1px] bg-black/5"></div>
                  <span className={step >= 2 ? 'text-black' : 'text-gray-300'}>02. Settlement</span>
                  <div className="w-8 h-[1px] bg-black/5"></div>
                  <span className="text-gray-300">03. Finality</span>
                </nav>
                <h2 className="text-6xl font-black uppercase tracking-tighter">Checkout.</h2>
              </div>

              {step === 1 ? (
                <div className="space-y-12 animate-in slide-in-from-left duration-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Given Name</label>
                      <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Surname</label>
                      <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Email Alias</label>
                      <input type="email" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                    </div>
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Destination Address</label>
                      <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">City</label>
                      <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Postal Index</label>
                      <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="group flex items-center justify-between w-full md:w-auto md:min-w-[300px] px-10 py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all shadow-xl"
                  >
                    <span>Proceed To Settlement</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </button>
                </div>
              ) : (
                <div className="space-y-12 animate-in slide-in-from-right duration-700">
                  <div className="p-8 border border-[#D4AF37] bg-[#F8F7F4]/50 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <CreditCard className="w-6 h-6 text-[#D4AF37]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Encrypted Card Protocol</span>
                    </div>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold tracking-[0.2em]" />
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Expiry (MM/YY)</label>
                        <input type="text" placeholder="00 / 00" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">CVC Code</label>
                        <input type="text" placeholder="000" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-6">
                    <button 
                      onClick={() => setStep(3)}
                      className="group flex items-center justify-between w-full md:w-auto md:min-w-[300px] px-10 py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all shadow-xl"
                    >
                      <span>Authorize ${total.toLocaleString()}</span>
                      <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </button>
                    <button 
                      onClick={() => setStep(1)} 
                      className="flex items-center space-x-3 text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>Back to Logistics</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 bg-[#F8F7F4] p-10 lg:p-16 space-y-12">
                <div className="flex items-end justify-between border-b border-black/5 pb-6">
                   <h3 className="text-2xl font-black italic serif tracking-tighter">Artifact Summary.</h3>
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">{cart.length} items</span>
                </div>

                <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}`} className="flex items-center space-x-6">
                      <div className="relative w-20 h-28 bg-white flex-shrink-0 shadow-sm overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center font-black">{item.quantity}</span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-bold tracking-tight">{item.name}</h4>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">{item.selectedColor}</p>
                        <p className="text-xs font-bold mt-2">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-black/5 text-[10px] font-black uppercase tracking-[0.4em]">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Archive Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transit Protocol</span>
                    <span>{subtotal > 250 ? 'Complimentary' : '$25'}</span>
                  </div>
                  <div className="flex justify-between text-base pt-6 border-t border-black/5">
                    <span>Final Amount</span>
                    <span className="text-2xl font-black italic serif tracking-tighter text-black">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-8 opacity-40">
                  <div className="flex items-center space-x-4 text-[8px] font-black uppercase tracking-[0.4em]">
                    <Truck className="w-4 h-4" />
                    <span>Global Express Transit</span>
                  </div>
                  <div className="flex items-center space-x-4 text-[8px] font-black uppercase tracking-[0.4em]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Lumière Trust Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
