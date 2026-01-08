
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, X, Instagram, Facebook, Twitter, Trash2, Plus, Minus, User, ArrowRight, MessageSquare, Send, Sparkles, MoveRight, Heart, LogOut, Settings, UserPlus, LogIn } from 'lucide-react';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import CartPage from './pages/CartPage';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { CartItem, Product } from './types';
import { GoogleGenAI } from "@google/genai";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();
  const lastPathname = useRef(pathname);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          const yOffset = -80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset + yOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      // If no hash, always scroll to top on mount or pathname change
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    lastPathname.current = pathname;
  }, [hash, pathname]);

  return null;
};

const NavigationMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { label: 'Home', path: '/', sub: 'Start the Journey', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Products', path: '/products', sub: 'The Archive', img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Dashboard', path: '/dashboard', sub: 'Patron Portal', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1200' },
    { label: 'Contact', path: '/contact', sub: 'Dialogue', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200' }
  ];

  return (
    <div 
      className={`fixed inset-0 z-[200] transition-all duration-700 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      <div 
        className={`absolute inset-0 bg-white flex flex-col md:flex-row transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex-1 flex flex-col p-12 lg:p-24 justify-center relative overflow-hidden bg-white">
          <button onClick={onClose} className="absolute top-12 left-12 group flex items-center space-x-4 z-[210]">
            <X className="w-8 h-8 group-hover:rotate-90 transition-transform text-black" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black">Close</span>
          </button>
          
          <nav className="flex flex-col space-y-2 relative z-10">
            {menuItems.map((item, i) => (
              <Link 
                key={item.label}
                to={item.path}
                onClick={onClose}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col transition-all duration-500 transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${300 + i * 100}ms` : '0ms' }}
              >
                <div className="flex items-baseline space-x-6 overflow-hidden">
                  <span className="text-xs font-black text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">0{i+1}</span>
                  <span className="text-5xl md:text-8xl font-black tracking-tighter hover:italic hover:text-[#D4AF37] transition-all duration-500 uppercase">
                    {item.label}.
                  </span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-gray-300 ml-10 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-2 group-hover:translate-y-0">
                  {item.sub}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div 
          className={`hidden md:flex w-full md:w-[450px] bg-[#F8F7F4] p-12 lg:p-20 flex-col justify-between border-l border-black/5 transition-all duration-1000 delay-300 relative overflow-hidden ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {menuItems.map((item, i) => (
            <div 
              key={`img-${i}`}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out z-0 ${
                hoveredIndex === i ? 'opacity-40 scale-100' : 'opacity-0 scale-110'
              }`}
            >
              <img src={item.img} className="w-full h-full object-cover grayscale" alt="" />
            </div>
          ))}

          <div className="relative z-10 space-y-16">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Selected Series</h4>
              <div className="flex flex-col space-y-4 text-xl font-bold tracking-tight">
                {[
                  { label: 'Voyager', id: 'voyager' },
                  { label: 'Academic', id: 'academic' },
                  { label: 'Handbags', id: 'handbags' },
                  { label: 'Evening', id: 'evening' }
                ].map((cat) => (
                  <Link key={cat.id} to={`/#${cat.id}`} onClick={onClose} className="group flex items-center space-x-4 hover:text-[#D4AF37] transition-colors">
                    <span>{cat.label}</span>
                    <MoveRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-2">
              <p className="text-[10px] text-black font-black uppercase tracking-[0.4em]">Lumière Paris HQ</p>
              <p className="text-[9px] text-gray-400 font-medium uppercase tracking-[0.3em] leading-relaxed">
                24 Ave Montaigne, Paris, FR.
              </p>
            </div>
            <div className="flex space-x-8">
              <Instagram className="w-4 h-4 opacity-40 hover:opacity-100 transition-all cursor-pointer text-black" />
              <Facebook className="w-4 h-4 opacity-40 hover:opacity-100 transition-all cursor-pointer text-black" />
              <Twitter className="w-4 h-4 opacity-40 hover:opacity-100 transition-all cursor-pointer text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [query, setQuery] = useState('');
  
  return (
    <div 
      className={`fixed inset-0 z-[250] transition-all duration-700 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      <div 
        className={`absolute inset-0 bg-white transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) flex flex-col items-center justify-center ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button onClick={onClose} className="absolute top-12 right-12 group flex items-center space-x-4 z-[260]">
          <span className="text-[10px] font-black uppercase tracking-widest text-black">Close</span>
          <X className="w-8 h-8 group-hover:rotate-90 transition-transform text-black" />
        </button>

        <div className="container max-w-4xl px-6 space-y-12">
          <div className="space-y-4 text-center">
            <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Refined Search</span>
            <div className="relative group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="DISCOVER THE ARCHIVE"
                className="w-full bg-transparent border-b-2 border-black/10 py-8 text-4xl md:text-6xl font-black uppercase tracking-tighter outline-none focus:border-[#D4AF37] transition-colors placeholder:text-black/5"
                autoFocus={isOpen}
              />
              <Search className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 transition-colors ${query ? 'text-[#D4AF37]' : 'text-black/10'}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Trending Artifacts</h4>
              <div className="flex flex-col space-y-4">
                {['Horizon Weekender', 'Academic Pro V2', 'Midnight Clutch'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => setQuery(item)}
                    className="text-2xl font-bold tracking-tight text-black hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Collections</h4>
              <div className="flex flex-wrap gap-4">
                {['Travel', 'Academic', 'Handbags', 'Evening'].map((cat) => (
                  <button 
                    key={cat} 
                    className="px-6 py-3 bg-[#F8F7F4] text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Greetings. I am the Lumière Luxury Concierge. How may I assist your discovery today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })), { role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction: 'You are the Lumière Luxury Concierge. You assist customers with inquiries about Lumière high-end carry goods. Your tone is sophisticated, high-end, and helpful. You represent a brand that values heritage and minimalism. If asked about pricing, reference our premium tiers starting from $89 to $450.',
          temperature: 0.7,
        }
      });

      const modelText = response.text || 'I apologize, but my connection to the atelier is momentarily unstable.';
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Protocol error. Please retry shortly.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[140] w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#D4AF37] transition-all group overflow-hidden"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <div className={`fixed inset-0 lg:inset-auto lg:bottom-28 lg:right-8 lg:w-[400px] lg:h-[600px] z-[260] bg-white lg:shadow-2xl transition-all duration-500 ease-in-out flex flex-col border border-black/5 ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-12 invisible pointer-events-none'
      }`}>
        <div className="bg-black text-white p-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-black uppercase tracking-widest">Luxury Concierge</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#F8F7F4]/30 no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 ${
                m.role === 'user' 
                  ? 'bg-black text-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl' 
                  : 'bg-white text-black border border-black/5 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl'
              }`}>
                <p className="text-sm font-medium leading-relaxed italic serif">{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 border border-black/5 rounded-full flex space-x-2">
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-8 bg-white border-t border-black/5">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire about artifacts..."
              className="w-full bg-[#F8F7F4] border-none py-4 px-6 pr-14 text-xs font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`absolute right-2 p-3 ${input.trim() ? 'text-[#D4AF37]' : 'text-gray-300'}`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ cartCount, wishlistCount, toggleCart, toggleMenu, toggleSearch, isLoggedIn, onLogout }: { cartCount: number, wishlistCount: number, toggleCart: () => void, toggleMenu: () => void, toggleSearch: () => void, isLoggedIn: boolean, onLogout: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeSolid = isScrolled || !isHomePage;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[150] transition-all duration-700 ease-in-out ${
        shouldBeSolid ? 'h-16 bg-white/95 backdrop-blur-xl shadow-sm border-b border-black/5' : 'h-24 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <button onClick={toggleMenu} className="group flex items-center space-x-3">
          <div className="space-y-1.5">
            <div className={`h-[1.5px] bg-current transition-all duration-500 ${shouldBeSolid ? 'w-6 text-black' : 'w-8 text-white'}`}></div>
            <div className={`h-[1.5px] bg-current transition-all duration-500 ${shouldBeSolid ? 'w-4 text-black' : 'w-5 text-white'}`}></div>
          </div>
          <span className={`text-[9px] font-black uppercase tracking-[0.4em] hidden md:block transition-colors ${shouldBeSolid ? 'text-black' : 'text-white'}`}>Menu</span>
        </button>

        <Link 
          to="/" 
          className={`text-2xl font-black tracking-[0.5em] transition-all duration-700 ${
            shouldBeSolid ? 'text-black' : 'text-white scale-110'
          }`}
        >
          LUMIÈRE
        </Link>

        <div className={`flex items-center space-x-6 transition-colors ${shouldBeSolid ? 'text-black' : 'text-white'}`}>
          <button onClick={toggleSearch} className="hover:text-[#D4AF37] transition-colors p-2"><Search className="w-4 h-4" /></button>
          
          <div className="relative group p-2">
            <Link to={isLoggedIn ? "/dashboard" : "/auth"} className="hover:text-[#D4AF37] transition-colors block">
              <User className="w-4 h-4" />
            </Link>
            
            <div className="absolute top-full right-0 w-64 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 cubic-bezier(0.165, 0.84, 0.44, 1) z-[200]">
              <div className="bg-white shadow-2xl border border-black/5 p-8 flex flex-col space-y-6 backdrop-blur-xl bg-white/95">
                {isLoggedIn ? (
                  <>
                    <div className="space-y-1 border-b border-black/5 pb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Patron Identity</p>
                      <p className="text-sm font-bold truncate">Julian Vane</p>
                    </div>
                    
                    <nav className="flex flex-col space-y-4">
                      <Link to="/dashboard" className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors group/item">
                        <span>Dashboard</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover/item:translate-x-1" />
                      </Link>
                      <Link to="/dashboard?tab=wishlist" className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors group/item">
                        <span>Curated List ({wishlistCount})</span>
                        <Heart className="w-3 h-3 transition-transform group-hover/item:scale-110" />
                      </Link>
                      <Link to="/dashboard?tab=settings" className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors group/item">
                        <span>Settings</span>
                        <Settings className="w-3 h-3 transition-transform group-hover/item:rotate-90" />
                      </Link>
                    </nav>
                    
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center space-x-3 text-[9px] font-black uppercase tracking-[0.4em] text-red-400 hover:text-red-600 transition-colors pt-2 border-t border-black/5"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Terminate Session</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="space-y-1 border-b border-black/5 pb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Welcome Patron</p>
                      <p className="text-sm font-bold truncate">Join the Collective</p>
                    </div>
                    
                    <nav className="flex flex-col space-y-4">
                      <Link to="/auth" className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors group/item">
                        <span>Sign In</span>
                        <LogIn className="w-3 h-3 transition-transform group-hover/item:translate-x-1" />
                      </Link>
                      <Link to="/auth" className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors group/item">
                        <span>Create Identity</span>
                        <UserPlus className="w-3 h-3 transition-transform group-hover/item:scale-110" />
                      </Link>
                    </nav>
                  </>
                )}
              </div>
            </div>
          </div>

          <button onClick={toggleCart} className="relative group flex items-center space-x-2 p-2">
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            <span className={`text-[10px] font-black ${shouldBeSolid ? 'text-black' : 'text-white'}`}>({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeItem }: any) => {
  const subtotal = useMemo(() => cart.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0), [cart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl animate-in slide-in-from-right duration-700 flex flex-col">
        <div className="p-12 flex items-center justify-between border-b border-black/5">
          <h2 className="text-3xl font-black italic serif tracking-tighter">Your Bag.</h2>
          <button onClick={onClose} className="p-4 hover:bg-gray-50 transition-colors rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-12 py-8 space-y-10">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <ShoppingBag className="w-10 h-10 text-gray-200" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Empty Archive</p>
              <button onClick={onClose} className="text-[10px] font-black border-b-2 border-black pb-2 uppercase tracking-widest">Start Exploring</button>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={`${item.id}-${item.selectedColor}`} className="flex space-x-8 group">
                <div className="w-24 h-32 flex-shrink-0 bg-[#F8F7F4] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold tracking-tight">{item.name}</h3>
                      <p className="text-[8px] text-gray-400 uppercase font-black tracking-widest">{item.selectedColor}</p>
                    </div>
                    <button onClick={() => removeItem(item.id, item.selectedColor)} className="text-gray-300 hover:text-black transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 border border-black/5 px-4 py-2 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.selectedColor, -1)} className="hover:text-[#D4AF37]"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedColor, 1)} className="hover:text-[#D4AF37]"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-lg font-black italic serif">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-12 space-y-8 bg-[#F8F7F4]/50 border-t border-black/5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Total</span>
              <span className="text-4xl font-black italic serif tracking-tighter">${subtotal.toLocaleString()}</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={onClose} 
              className="block w-full bg-black text-white text-center py-6 uppercase text-[10px] font-black tracking-[0.5em] hover:bg-[#D4AF37] transition-all shadow-xl"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-black/5 pt-40 pb-20 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div className="lg:col-span-6 space-y-16">
          <h2 className="text-5xl md:text-8xl font-black italic serif tracking-tighter leading-none text-black">Lumière.</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm">
            Exclusive releases, artistic collaborations, and curated narratives.
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-black">Artifacts</h4>
            <div className="flex flex-col space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <Link to="/#voyager" className="hover:text-black transition-colors">Voyager</Link>
              <Link to="/#academic" className="hover:text-black transition-colors">Academic</Link>
              <Link to="/#handbags" className="hover:text-black transition-colors">Essentials</Link>
              <Link to="/#evening" className="hover:text-black transition-colors">After Hours</Link>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-black">Service</h4>
            <div className="flex flex-col space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <Link to="/" className="hover:text-black transition-colors">Transit</Link>
              <Link to="/" className="hover:text-black transition-colors">Protocol</Link>
              <Link to="/" className="hover:text-black transition-colors">Concierge</Link>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-black">Connect</h4>
            <div className="flex flex-col space-y-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <Link to="/contact" className="hover:text-black transition-colors">Dialogue</Link>
              <a href="#" className="hover:text-black transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-40 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">LUMIÈRE 2025 • PARIS</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isCartOpen || isSearchOpen) ? 'hidden' : 'auto';
  }, [isMenuOpen, isCartOpen, isSearchOpen]);

  const addToCart = (product: Product, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === color) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id: string) => wishlist.some(item => item.id === id);

  const updateQuantity = (id: string, color: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedColor === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string, color: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color)));
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen flex flex-col relative">
        <Header 
          cartCount={cartCount} 
          wishlistCount={wishlist.length}
          toggleCart={() => setIsCartOpen(true)} 
          toggleMenu={() => setIsMenuOpen(true)}
          toggleSearch={() => setIsSearchOpen(true)}
          isLoggedIn={isLoggedIn}
          onLogout={() => setIsLoggedIn(false)}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/products" element={<Products addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />} />
            <Route path="/cart" element={<CartPage cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/dashboard" element={<Dashboard onLogout={() => setIsLoggedIn(false)} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
          </Routes>
        </main>

        <Footer />
        
        <NavigationMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />

        <SearchOverlay 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />

        <ChatBot />
      </div>
    </Router>
  );
}
