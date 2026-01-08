
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Shield, Truck, RefreshCw, ChevronDown, Plus, Minus, Share2, Heart, MoveRight } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../constants';
import { Product } from '../types';

const Accordion = ({ title, content }: { title: string, content: React.Key | React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-sm font-bold uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <div className="text-sm text-gray-600 leading-relaxed font-medium italic serif">
          {content}
        </div>
      </div>
    </div>
  );
};

export default function ProductDetail({ addToCart, toggleWishlist, isInWishlist }: any) {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // Carousel logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      window.scrollTo(0, 0); // Ensure detail page starts at top
    }
  }, [product, id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!product) return <div className="py-48 text-center font-black uppercase tracking-widest">Piece not found in Archive.</div>;

  const related = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);

  return (
    <div className="animate-in fade-in duration-1000 pb-24 bg-white">
      <div className="container mx-auto px-8 pt-32">
        <nav className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mb-12 flex items-center space-x-3">
          <Link to="/" className="hover:text-black transition-colors">Archive</Link>
          <span className="text-gray-200">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
          <span className="text-gray-200">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Gallery */}
          <div className="space-y-8 sticky top-32">
            <div className="aspect-[4/5] bg-[#F8F7F4] overflow-hidden relative group">
              <img 
                src={product.images[activeImage] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
              />
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                }}
                className="absolute top-8 right-8 p-5 bg-white/80 backdrop-blur rounded-full shadow-2xl hover:bg-white transition-all z-20 group/btn"
              >
                <Heart className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black group-hover/btn:text-red-500'}`} />
              </button>
              
              {product.isNew && (
                <div className="absolute top-8 left-8 bg-black text-white px-6 py-2.5 text-[9px] font-black uppercase tracking-widest">
                  New Artifact
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition-all duration-500 ${activeImage === i ? 'border-[#D4AF37] opacity-100' : 'border-transparent opacity-40 hover:opacity-80'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">{product.category} Lineage</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">{product.name}.</h1>
              
              <div className="flex items-center space-x-6 pt-2">
                <div className="flex items-center space-x-1.5 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : ''}`} />
                  ))}
                  <span className="text-[10px] font-black ml-2 text-black">{product.rating}</span>
                </div>
                <div className="w-px h-4 bg-black/5"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">{product.reviewsCount} Patrons Authenticated</span>
              </div>
              
              <p className="text-4xl font-black italic serif text-black">${product.price}</p>
              
              <p className="text-lg text-gray-500 font-light italic serif leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="space-y-10 pt-4">
              {/* Color Selector */}
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Variant Palette: {selectedColor}</span>
                <div className="flex space-x-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${selectedColor === color ? 'border-black' : 'border-transparent hover:border-black/10'}`}
                    >
                      <div className="w-full h-full rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: color.toLowerCase() }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Cart */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center border border-black/5 bg-[#F8F7F4]/50 h-20 w-full sm:w-48 justify-between px-8">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-[#D4AF37] transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="font-black text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-[#D4AF37] transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
                <button 
                  onClick={() => addToCart(product, selectedColor)}
                  className="flex-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#D4AF37] transition-all h-20 shadow-2xl"
                >
                  Acquire Artifact
                </button>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-8 py-10 border-y border-black/5">
                <div className="flex items-center space-x-4">
                  <Truck className="w-5 h-5 text-[#D4AF37]" />
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest">Transit Protocol</p>
                    <p className="text-[8px] font-medium text-gray-400 uppercase tracking-widest">Global Express</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <RefreshCw className="w-5 h-5 text-[#D4AF37]" />
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest">Return Policy</p>
                    <p className="text-[8px] font-medium text-gray-400 uppercase tracking-widest">30 Day Window</p>
                  </div>
                </div>
              </div>

              {/* Accordions */}
              <div className="pt-4">
                <Accordion title="Artifact DNA" content={
                  <ul className="space-y-4">
                    <li className="flex justify-between"><span className="font-black uppercase tracking-widest text-[9px] text-gray-400">Primary Material</span> <span className="text-black">{product.material}</span></li>
                    <li className="flex justify-between"><span className="font-black uppercase tracking-widest text-[9px] text-gray-400">Dimensions</span> <span className="text-black">{product.dimensions}</span></li>
                    <li className="flex justify-between"><span className="font-black uppercase tracking-widest text-[9px] text-gray-400">Architecture</span> <span className="text-black">Structural Reinforcement</span></li>
                    <li className="flex justify-between"><span className="font-black uppercase tracking-widest text-[9px] text-gray-400">Interior</span> <span className="text-black">Satin-lined with Compartments</span></li>
                  </ul>
                } />
                <Accordion title="Logistics & Returns" content="We offer free worldwide express transit on all artifacts over $250. Orders are processed within 24 hours in our atelier. Returns are processed within 30 days for a complete manifest refund." />
                <Accordion title="Preservation Guide" content="Avoid prolonged exposure to intense light and humidity. Use a soft, microfiber cloth for surface preservation. We recommend professional archival cleaning every 12 months." />
              </div>

              <button className="group flex items-center space-x-4 text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-all">
                <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Transmit Artifact Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-40 pt-24 border-t border-black/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 space-y-8 md:space-y-0">
            <div className="space-y-4">
               <div className="flex items-center space-x-4">
                  <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
                  <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">The Feedback</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Patron Testimonials.</h2>
            </div>
            <button className="px-12 py-5 border border-black text-[9px] font-black uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all">Contribute Review</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="space-y-8 p-12 bg-[#F8F7F4]/50 border border-black/5 hover:bg-white hover:shadow-2xl transition-all duration-700">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden grayscale">
                       <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase tracking-tight">{review.user}</h4>
                      <p className="text-[8px] text-gray-300 font-black uppercase tracking-[0.3em]">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-[#D4AF37]' : ''}`} />)}
                  </div>
                </div>
                <p className="text-lg text-gray-600 italic serif leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-40 overflow-hidden">
          <div className="flex flex-col items-center justify-center space-y-6 mb-20">
             <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Recommended Discovery</span>
             <h2 className="text-5xl font-black uppercase tracking-tighter text-center">Related Artifacts.</h2>
          </div>
          
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex space-x-12 overflow-x-auto pb-16 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing ${isDragging ? 'select-none' : ''}`}
          >
            {related.map((p) => (
              <div key={p.id} className="flex-shrink-0 w-[85vw] md:w-[400px] snap-center">
                <div className="group space-y-8">
                  <Link to={`/product/${p.id}`} className="block relative aspect-[4/5] overflow-hidden bg-[#F8F7F4] shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700 pointer-events-none" />
                  </Link>
                  <div className="flex justify-between items-start px-2">
                    <div className="space-y-2">
                      <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">{p.category}</p>
                      <Link to={`/product/${p.id}`} className="text-xl font-bold tracking-tight hover:italic hover:text-[#D4AF37] transition-all block">{p.name}</Link>
                    </div>
                    <p className="text-2xl font-black italic serif text-black">${p.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-12 pt-8 opacity-20">
             <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black uppercase tracking-widest">Swipe to Discover</span>
                <MoveRight className="w-4 h-4 animate-bounce-x" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add keyframes for custom animation in index.html or here via style tag
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce-x {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }
  .animate-bounce-x {
    animation: bounce-x 2s infinite ease-in-out;
  }
`;
document.head.appendChild(style);
