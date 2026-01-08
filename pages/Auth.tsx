
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Auth({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row animate-in fade-in duration-1000 overflow-hidden">
      {/* Left Column: Visual Storytelling */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src={isLogin 
              ? "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200" 
              : "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200"
            } 
            className="w-full h-full object-cover opacity-60 grayscale transition-all duration-[2s] group-hover:scale-110 group-hover:grayscale-0" 
            alt="Editorial Campaign"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10"></div>
        
        <div className="relative z-20 w-full h-full p-24 flex flex-col justify-between items-start text-white">
          <div className="space-y-4">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.8em]">Lumière Paris</span>
            <div className="w-12 h-[1px] bg-white/30"></div>
          </div>
          
          <div className="space-y-8 max-w-md">
            <h2 className="text-6xl font-black italic serif leading-tight tracking-tighter">
              {isLogin ? "A Return to Elegance." : "The Genesis of Style."}
            </h2>
            <p className="text-lg text-white/60 font-light italic serif leading-relaxed">
              {isLogin 
                ? "Experience the zenith of artisanal craftsmanship. Your archive of curated pieces is just one connection away."
                : "Join an elite collective of discerners. Gain access to private drops, bespoke concierge, and a lifetime of heritage."
              }
            </p>
          </div>

          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
            Est. 2025 • Artisanal Excellence
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Interface */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-[#FCFCFA]">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.01] leading-none uppercase tracking-tighter">Identity</div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Sparkles className="w-6 h-6 text-[#D4AF37] opacity-50" />
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">The Sanctuary</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-black">
              {isLogin ? 'Welcome Home.' : 'Start Lineage.'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {!isLogin && (
              <div className="group relative">
                <label className="absolute -top-6 left-0 text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 transition-all group-focus-within:text-[#D4AF37]">The Signature</label>
                <div className="flex items-center space-x-4 border-b border-black/10 py-4 transition-all group-focus-within:border-[#D4AF37]">
                  <User className="w-4 h-4 text-gray-300" />
                  <input 
                    type="text" 
                    required 
                    className="flex-1 bg-transparent outline-none text-sm font-bold placeholder:text-gray-200" 
                    placeholder="e.g. Julian Vane" 
                  />
                </div>
              </div>
            )}
            
            <div className="group relative">
              <label className="absolute -top-6 left-0 text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 transition-all group-focus-within:text-[#D4AF37]">Digital Alias</label>
              <div className="flex items-center space-x-4 border-b border-black/10 py-4 transition-all group-focus-within:border-[#D4AF37]">
                <Mail className="w-4 h-4 text-gray-300" />
                <input 
                  type="email" 
                  required 
                  className="flex-1 bg-transparent outline-none text-sm font-bold placeholder:text-gray-200" 
                  placeholder="e.g. identity@lumiere.paris" 
                />
              </div>
            </div>

            <div className="group relative">
              <div className="flex justify-between items-center absolute -top-6 left-0 w-full">
                <label className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 group-focus-within:text-[#D4AF37]">Access Key</label>
                {isLogin && (
                  <button type="button" className="text-[8px] font-black uppercase tracking-[0.3em] text-[#D4AF37] hover:text-black transition-colors">Forgotten Key?</button>
                )}
              </div>
              <div className="flex items-center space-x-4 border-b border-black/10 py-4 transition-all group-focus-within:border-[#D4AF37]">
                <Lock className="w-4 h-4 text-gray-300" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="flex-1 bg-transparent outline-none text-sm font-bold tracking-[0.4em] placeholder:text-gray-200" 
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-200 hover:text-[#D4AF37] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-6 space-y-8">
              <button type="submit" className="group flex items-center justify-between w-full px-10 py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all shadow-xl">
                <span>{isLogin ? 'Authorize Access' : 'Create Identity'}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>

              <div className="flex items-center justify-center space-x-4 opacity-30">
                <div className="h-[1px] flex-1 bg-black"></div>
                <span className="text-[8px] font-black uppercase tracking-widest">or</span>
                <div className="h-[1px] flex-1 bg-black"></div>
              </div>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-1"
                >
                  {isLogin ? "DON'T HAVE AN ACCOUNT? JOIN THE COLLECTIVE" : "ALREADY A MEMBER? ACCESS YOUR ACCOUNT"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Floating Mobile-only elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:hidden text-center opacity-30 space-y-2 w-full">
           <p className="text-[8px] font-black uppercase tracking-widest">Encrypted by Lumière Protocol</p>
        </div>
      </div>
    </div>
  );
}
