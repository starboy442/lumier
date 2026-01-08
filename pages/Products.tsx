
import React, { useState, useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, X, Star, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, CategoryType } from '../types';

// Defined interface for QuickViewModalProps to improve type safety
interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  addToCart: any;
  toggleWishlist: any;
  isInWishlist: any;
}

const QuickViewModal = ({ product, onClose, addToCart, toggleWishlist, isInWishlist }: QuickViewModalProps) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in duration-500">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/2 bg-[#F8F7F4] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all group"
          >
            <Heart className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black group-hover:text-red-500'}`} />
          </button>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.4em]">{product.category}</p>
              <h2 className="text-3xl font-black uppercase tracking-tighter">{product.name}</h2>
            </div>
            
            <p className="text-2xl font-black italic serif text-black">${product.price}</p>
            
            <p className="text-sm text-gray-500 leading-relaxed font-medium italic serif">
              {product.description}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Rating:</span>
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : ''}`} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    addToCart(product, product.colors[0]);
                    onClose();
                  }}
                  className="group flex items-center justify-between w-full px-8 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#D4AF37] transition-all shadow-xl"
                >
                  <span>Add To Bag</span>
                  <ShoppingBag className="w-4 h-4" />
                </button>
                
                <Link 
                  to={`/product/${product.id}`}
                  className="flex items-center justify-center space-x-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-all pt-2"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Added interface for ProductCardProps to ensure compatibility and fix 'key' related errors in list rendering
// Added optional key property to resolve strict TypeScript prop validation during map rendering
interface ProductCardProps {
  product: Product;
  addToCart: any;
  onQuickView: (product: Product) => void;
  toggleWishlist: any;
  isInWishlist: any;
  index: number;
  key?: React.Key;
}

const ProductCard = ({ product, addToCart, onQuickView, toggleWishlist, isInWishlist, index }: ProductCardProps) => {
  return (
    <div 
      className="group space-y-6 transition-all duration-700 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8"
      style={{ 
        animationDelay: `${index * 60}ms`, 
        animationFillMode: 'backwards',
        animationDuration: '800ms'
      }}
    >
      <div className="relative aspect-[4/5] bg-[#F8F7F4] overflow-hidden shadow-sm transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-[0.3]"
          />
        </Link>
        
        {product.isNew && (
          <span className="absolute top-6 left-6 px-4 py-2 bg-white text-black text-[9px] uppercase font-black tracking-widest shadow-2xl z-20 transition-transform group-hover:scale-110">New In</span>
        )}
        
        {/* Wishlist Icon */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 hover:bg-white z-30 shadow-lg"
        >
          <Heart className={`w-4 h-4 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black hover:text-red-500'}`} />
        </button>

        {/* Overlay Background & Blur */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 group-hover:backdrop-blur-[1px] transition-all duration-700 pointer-events-none z-10" />
        
        {/* Hover Actions Staggered Smooth Reveal */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col space-y-3 z-20">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="w-full py-4 bg-white/95 backdrop-blur text-black uppercase text-[9px] font-black tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all duration-700 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 shadow-2xl"
            style={{ transitionDelay: '50ms' }}
          >
            Quick View
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.colors[0]);
            }}
            className="w-full py-4 bg-black text-white uppercase text-[9px] font-black tracking-widest hover:bg-[#D4AF37] transition-all duration-700 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 shadow-2xl"
            style={{ transitionDelay: '150ms' }}
          >
            Add to Bag
          </button>
        </div>
      </div>
      
      <div className="space-y-2 transition-all duration-500 px-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">{product.category}</p>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-base font-bold group-hover:italic group-hover:text-[#D4AF37] transition-all">{product.name}</h3>
            </Link>
          </div>
          <p className="font-bold text-xl group-hover:scale-110 transition-transform">${product.price}</p>
        </div>
        <div className="flex items-center space-x-1 text-[#D4AF37]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : ''}`} />
          ))}
          <span className="text-[9px] text-gray-300 font-black ml-2 uppercase tracking-widest">({product.reviewsCount} PATRONS)</span>
        </div>
      </div>
    </div>
  );
};

// Defined interface for Products component to improve type safety
interface ProductsProps {
  addToCart: any;
  toggleWishlist: any;
  isInWishlist: any;
}

export default function Products({ addToCart, toggleWishlist, isInWishlist }: ProductsProps) {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as CategoryType) || 'All';
  
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState('Featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = ['All', 'Travel', 'School', 'Handbags', 'Fancy'];
  const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Best Rating'];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useLayoutEffect(() => {
    const updatePill = () => {
      const activeIndex = categories.indexOf(activeCategory);
      const activeTab = tabRefs.current[activeIndex];
      if (activeTab) {
        setPillStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          opacity: 1
        });
      }
    };

    updatePill();
    const timer = setTimeout(updatePill, 50);
    window.addEventListener('resize', updatePill);

    return () => {
      window.removeEventListener('resize', updatePill);
      clearTimeout(timer);
    };
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Best Rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="animate-in fade-in duration-700 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#F8F7F4] pt-40 pb-20 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full text-[15vw] font-black text-black/[0.02] uppercase tracking-tighter pointer-events-none select-none -translate-y-1/2">
          COLLECTIONS
        </div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Selected Archives</span>
            </div>
            <div key={activeCategory} className="animate-in fade-in slide-in-from-left-4 duration-1000">
               <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none">
                {activeCategory === 'All' ? 'Complete Archive.' : `${activeCategory}.`}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-400 font-light italic serif max-w-xl">
              Curated artifacts designed for longevity, minimalist aesthetics, and the discerning modern voyager.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        {/* Enhanced Tab Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 border-b border-black/5 pb-12 space-y-8 md:space-y-0">
          <div className="relative flex items-center bg-[#F8F7F4]/80 p-1.5 rounded-full overflow-hidden w-full md:w-auto">
            {/* Sliding Pill Background */}
            <div 
              className="absolute top-1.5 bottom-1.5 bg-black rounded-full transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) shadow-lg"
              style={{
                left: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
                zIndex: 0
              }}
            />
            
            {categories.map((cat, i) => (
              <button
                key={cat}
                ref={el => { tabRefs.current[i] = el; }}
                onClick={() => setActiveCategory(cat)}
                className={`relative z-10 px-8 py-3.5 text-[9px] font-black uppercase tracking-[0.4em] whitespace-nowrap transition-colors duration-700 ${
                  activeCategory === cat ? 'text-white' : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className={`ml-2 text-[7px] align-top transition-colors duration-700 ${activeCategory === cat ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                    {MOCK_PRODUCTS.filter(p => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-12 w-full md:w-auto justify-between md:justify-end px-4 md:px-0">
            <div className="relative group">
              <button className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors">
                <span>Sorting: {sortBy}</span>
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <div className="absolute top-full right-0 mt-6 w-64 bg-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-700 z-50 border border-black/5 backdrop-blur-xl bg-white/95">
                <div className="py-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`w-full text-left px-8 py-5 text-[9px] uppercase font-black tracking-widest transition-all ${
                        sortBy === opt ? 'bg-[#F8F7F4] text-[#D4AF37]' : 'hover:bg-[#F8F7F4] hover:text-black'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Wrapper for Animation */}
        <div 
          key={`${activeCategory}-${sortBy}`} 
          className="animate-in fade-in slide-in-from-bottom-6 duration-1000 cubic-bezier(0.19, 1, 0.22, 1)"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={`${product.id}-${activeCategory}-${sortBy}`} 
                product={product} 
                index={idx}
                addToCart={addToCart} 
                onQuickView={(p: Product) => setQuickViewProduct(p)}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center space-y-10 animate-in fade-in zoom-in duration-1000">
            <div className="flex flex-col items-center space-y-6">
              <ShoppingBag className="w-16 h-16 text-gray-100" />
              <p className="text-gray-400 text-xl font-light italic serif">No artifacts found in this collection.</p>
            </div>
            <button 
              onClick={() => setActiveCategory('All')} 
              className="px-12 py-6 bg-black text-white uppercase text-[10px] font-black tracking-[0.5em] hover:bg-[#D4AF37] transition-all shadow-xl"
            >
              Reset Discovery
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="mt-40 pt-16 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Displaying {filteredProducts.length} results</p>
            <div className="flex items-center space-x-6">
              <button className="w-12 h-12 text-xs font-black bg-black text-white shadow-xl flex items-center justify-center">01</button>
              <button className="w-12 h-12 text-xs font-black text-gray-300 hover:text-black transition-colors flex items-center justify-center">02</button>
              <div className="w-12 h-[1px] bg-black/5"></div>
              <button className="group flex items-center space-x-4 text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 hover:text-black transition-colors">
                <span>Next Sequence</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      <QuickViewModal 
        product={quickViewProduct!} 
        onClose={() => setQuickViewProduct(null)} 
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </div>
  );
}
