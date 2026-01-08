
import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Instagram, Twitter, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <div className="animate-in fade-in duration-1000 bg-white">
      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-[1px] bg-[#D4AF37]"></div>
                  <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Liaison Office</span>
                </div>
                <h1 className="text-7xl md:text-[110px] leading-[0.85] font-black uppercase tracking-tighter">
                  Let's <br />
                  <span className="italic serif font-normal capitalize tracking-normal text-[#D4AF37]">Dialogue.</span>
                </h1>
                <p className="text-xl text-gray-400 font-light italic serif leading-relaxed max-w-md">
                  "Excellence is a shared journey. Whether seeking an archive piece or bespoke concierge services, our team is at your disposal."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-black/5">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Electronic</h4>
                  <p className="text-sm font-bold hover:text-[#D4AF37] transition-colors cursor-pointer">concierge@lumiere.paris</p>
                  <p className="text-sm font-bold hover:text-[#D4AF37] transition-colors cursor-pointer">press@lumiere.paris</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Telephony</h4>
                  <p className="text-sm font-bold">+33 (0) 1 42 68 71 00</p>
                  <p className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">Mon—Fri 10:00—18:00 CET</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Global Hubs</h4>
                  <div className="flex flex-col space-y-2 text-[10px] font-black uppercase tracking-widest">
                    <span>Paris</span>
                    <span>London</span>
                    <span>Tokyo</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Socials</h4>
                  <div className="flex space-x-6">
                    <Instagram className="w-4 h-4 hover:text-[#D4AF37] transition-all cursor-pointer" />
                    <Twitter className="w-4 h-4 hover:text-[#D4AF37] transition-all cursor-pointer" />
                    <Globe className="w-4 h-4 hover:text-[#D4AF37] transition-all cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#F8F7F4] -z-10 group-hover:inset-0 transition-all duration-700"></div>
                <div className="bg-white p-12 lg:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-black/5">
                  <form className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Full Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" placeholder="Julian Vane" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Email Address</label>
                        <input type="email" className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors text-sm font-bold" placeholder="j.vane@lumiere.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Subject Of Inquiry</label>
                      <div className="relative">
                        <select className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors appearance-none text-sm font-bold cursor-pointer">
                          <option>General Concierge</option>
                          <option>Private Showroom Booking</option>
                          <option>Bespoke Design Inquiry</option>
                          <option>Order Protocol Help</option>
                        </select>
                        <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 pointer-events-none opacity-20" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Detailed Narrative</label>
                      <textarea className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-[#D4AF37] transition-colors min-h-[120px] resize-none text-sm font-bold" placeholder="How may we assist you?"></textarea>
                    </div>

                    <button className="group flex items-center justify-between w-full md:w-auto md:min-w-[280px] px-10 py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all shadow-xl">
                      <span>Transmit Message</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/5 overflow-hidden">
            <div className="bg-[#F8F7F4] p-12 lg:p-24 flex flex-col justify-center space-y-8">
               <h3 className="text-4xl font-black italic serif tracking-tighter">Maison Mère.</h3>
               <div className="space-y-2">
                 <p className="text-lg font-bold">24 Avenue Montaigne</p>
                 <p className="text-lg font-bold">75008 Paris, France</p>
               </div>
               <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                 Our flagship atelier resides in the heart of the Golden Triangle. We welcome visitors for private viewings by appointment only.
               </p>
               <button className="text-[10px] font-black uppercase tracking-[0.5em] border-b-2 border-[#D4AF37] pb-2 w-max">Get Directions</button>
            </div>
            <div className="h-[500px] lg:h-auto overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover grayscale transition-transform duration-[3s] group-hover:scale-110" 
                alt="Studio"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Adding a simple icon used in Contact
const ChevronRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
