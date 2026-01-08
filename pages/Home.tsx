
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveRight, Heart, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

const FadeInSection = ({ children, delay = 0, id, className = "" }: { children?: React.Key | React.ReactNode, delay?: number, id?: string, className?: string, key?: React.Key }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [delay]);

  return (
    <div
      ref={domRef}
      id={id}
      className={`transition-all duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.99]'
      } ${className}`}
    >
      {children as any}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen bg-[#111] overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2400" 
          alt="Luxury Campaign" 
          className="w-full h-full object-cover opacity-70 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-10">
          <FadeInSection className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
              <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em]">Collection 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl leading-[0.9] font-black uppercase tracking-tighter text-white">
              The Art of <br />
              <span className="italic serif font-normal capitalize tracking-normal text-[#D4AF37]">Presence.</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-md leading-relaxed">
              Artifacts that blend heritage aesthetics with high-performance utility.
            </p>
          </FadeInSection>

          <FadeInSection delay={300} className="flex flex-wrap items-center gap-8">
            <Link to="/products" className="group relative px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-[#D4AF37] hover:text-white flex items-center shadow-2xl">
              Discover Archive
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

const FullPageBanner = ({ image, title, subtitle, accent, reverse = false }: { image: string, title: string, subtitle: string, accent: string, reverse?: boolean }) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      const offset = window.innerHeight - rect.top;
      if (offset > 0 && rect.top < window.innerHeight) {
        setScrollY(offset * 0.1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={bannerRef} className="relative min-h-[90vh] lg:h-screen w-full overflow-hidden flex items-center bg-[#0a0a0a] py-20 lg:py-0">
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt="" 
          className="w-full h-full object-cover opacity-60 grayscale scale-[1.2] transition-transform duration-[2s] ease-out"
          style={{ transform: `translateY(${scrollY - 60}px) scale(1.15)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
      </div>
      
      <div className={`container mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center lg:justify-between gap-16`}>
        <div className={`w-full lg:w-2/3 flex flex-col space-y-12 lg:space-y-16 ${reverse ? 'text-right items-end' : 'text-left items-start'}`}>
          
          <FadeInSection className="space-y-8 lg:space-y-10 w-full">
            <div className={`flex items-center space-x-6 lg:space-x-8 ${reverse ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="flex flex-col space-y-1">
                <span className="w-12 lg:w-20 h-[1.5px] bg-[#D4AF37]"></span>
                <span className="w-6 lg:w-10 h-[1px] bg-[#D4AF37]/30"></span>
              </div>
              <span className="text-[#D4AF37] text-[9px] lg:text-[10px] font-black uppercase tracking-[0.8em]">{accent}</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-[6vw] leading-[0.85] font-black uppercase tracking-tighter text-white mix-blend-difference">
              {title.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {i === title.split(' ').length - 1 ? (
                    <span className="italic serif font-normal text-[#D4AF37] block mt-4">{word}.</span>
                  ) : (
                    <span className="block">{word}</span>
                  )}
                </React.Fragment>
              ))}
            </h2>
          </FadeInSection>

          <FadeInSection delay={200} className={`w-full max-w-xl flex flex-col space-y-10 lg:space-y-12 ${reverse ? 'items-end' : 'items-start'}`}>
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 font-light italic serif leading-relaxed tracking-tight">
              {subtitle}
            </p>
            
            <Link 
              to="/products" 
              className={`group inline-flex items-center space-x-10 px-10 py-6 border border-white/10 hover:border-[#D4AF37] transition-all duration-1000 overflow-hidden relative ${reverse ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1)" />
              <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.6em] text-white group-hover:text-black transition-colors">
                The Collective
              </span>
              <ArrowRight className={`relative z-10 w-5 h-5 text-[#D4AF37] group-hover:text-black transition-all ${reverse ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
            </Link>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, addToCart, toggleWishlist, isInWishlist }: { product: Product, addToCart: any, toggleWishlist: any, isInWishlist: any }) => {
  return (
    <div className="group space-y-6 transition-all duration-700 hover:-translate-y-2">
      <div className="relative aspect-[4/5] bg-[#F8F7F4] overflow-hidden shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-[0.3]"
          />
        </Link>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 hover:bg-white z-20"
        >
          <Heart className={`w-4 h-4 transition-colors ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black hover:text-red-500'}`} />
        </button>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 group-hover:backdrop-blur-[1px] transition-all duration-700 pointer-events-none" />
        
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 cubic-bezier(0.165, 0.84, 0.44, 1) z-10">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.colors[0]);
            }}
            className="w-full py-5 bg-black text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37] transition-all shadow-2xl"
          >
            Acquire Piece
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start transition-all duration-500 px-1">
        <div className="space-y-1">
          <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold tracking-tight group-hover:italic group-hover:text-[#D4AF37] transition-all">{product.name}</h3>
          </Link>
        </div>
        <p className="text-lg font-bold group-hover:scale-110 transition-transform">${product.price}</p>
      </div>
    </div>
  );
};

const ScrollTriggeredSeries = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [horizontalDistance, setHorizontalDistance] = useState(0);

  const categories = [
    { title: 'Voyager', id: 'voyager', img: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800' },
    { title: 'Academic', id: 'academic', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
    { title: 'Essentials', id: 'handbags', img: 'https://images.unsplash.com/photo-1584917033904-491a84b2efbd?auto=format&fit=crop&q=80&w=800' },
    { title: 'Evening', id: 'evening', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fd15dcb4?auto=format&fit=crop&q=80&w=800' },
  ];

  const updateSize = () => {
    if (horizontalRef.current) {
      const scrollWidth = horizontalRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const distance = Math.max(0, scrollWidth - windowWidth + (windowWidth * 0.15));
      setHorizontalDistance(distance);
    }
  };

  useLayoutEffect(() => {
    updateSize();
    const resizeObserver = new ResizeObserver(() => updateSize());
    if (horizontalRef.current) resizeObserver.observe(horizontalRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={scrollRef} className="relative bg-white" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
           <div 
             className="text-[35vw] font-black text-black/[0.005] leading-none uppercase tracking-tighter whitespace-nowrap transition-transform duration-100 ease-out"
             style={{ transform: `translateX(${(scrollProgress - 0.5) * 15}%)` }}
           >
             COLLECTIONS • COLLECTIONS
           </div>
        </div>

        <div className="container mx-auto px-6 mb-16 relative z-20">
          <div className="flex flex-col space-y-4 max-w-4xl">
            <div className="flex items-center space-x-4">
               <div className="w-10 h-[1px] bg-[#D4AF37]"></div>
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">The Archive</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black leading-tight">
              Selected <span className="italic serif font-normal text-[#D4AF37] tracking-normal">Lineages.</span>
            </h2>
          </div>
        </div>

        <div 
          ref={horizontalRef}
          className="flex space-x-12 px-[10vw] transition-transform duration-100 -translate-y-12 ease-out will-change-transform items-center"
          style={{ transform: `translateX(-${scrollProgress * horizontalDistance}px)` }}
        >
          {categories.map((cat, i) => (
            <div key={cat.id} className="flex-shrink-0 w-[75vw] md:w-[450px]">
              <div className="space-y-8 group">
                <Link to={`/#${cat.id}`} className="relative block aspect-[16/10] overflow-hidden bg-[#F8F7F4] shadow-2xl">
                  <img src={cat.img} className="w-full h-full object-cover transition-all duration-1000" alt={cat.title} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white mb-2">Lineage 0{i+1}</span>
                    <h3 className="text-3xl font-bold text-white uppercase tracking-widest leading-none">{cat.title}</h3>
                  </div>
                </Link>
                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-300">Explore Collection</span>
                  <MoveRight className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home({ addToCart, toggleWishlist, isInWishlist }: any) {
  return (
    <div className="bg-white">
      <Hero />
      <ScrollTriggeredSeries />

      {/* Featured New Releases */}
      <section className="py-24 border-b border-gray-50">
        <div className="container mx-auto px-6">
          <FadeInSection className="mb-20 space-y-4">
             <div className="flex items-center space-x-4">
               <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">The Edit</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">New Releases.</h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4).map((product) => (
              <FadeInSection key={product.id}>
                <ProductCard product={product} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Series 01 - Voyager */}
      <section id="voyager" className="py-24 bg-[#F8F7F4]/50 scroll-mt-16">
        <div className="container mx-auto px-6">
          <FadeInSection className="mb-16 flex justify-between items-end">
             <div className="space-y-3">
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Series 01</span>
               <h2 className="text-4xl font-black uppercase tracking-tighter">Voyager.</h2>
             </div>
             <p className="text-sm font-medium italic serif text-gray-400 max-w-[240px]">Precision gear for long-range transit.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {MOCK_PRODUCTS.filter(p => p.category === 'Travel').slice(0, 4).map((p) => (
               <FadeInSection key={p.id}>
                  <ProductCard product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
               </FadeInSection>
             ))}
          </div>
        </div>
      </section>

      <FullPageBanner 
        image="https://images.unsplash.com/photo-1549439602-43ebcb2327af?auto=format&fit=crop&q=80&w=2400"
        accent="The Atlas Protocol"
        title="Modern Hardshell Architecture"
        subtitle="Engineered with aerodynamic precision and minimalist aesthetics. The Atlas Suitcase is a testament to the pursuit of the silent journey."
        reverse={true}
      />

      {/* Series 02 - Academic */}
      <section id="academic" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-6">
          <FadeInSection className="mb-16 text-right flex flex-row-reverse justify-between items-end">
             <div className="space-y-3">
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Series 02</span>
               <h2 className="text-4xl font-black uppercase tracking-tighter">Academic.</h2>
             </div>
             <p className="text-sm font-medium italic serif text-gray-400 max-w-[240px]">Intelligence in design for modern life.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {MOCK_PRODUCTS.filter(p => p.category === 'School').slice(0, 4).map((p) => (
               <FadeInSection key={p.id}>
                  <ProductCard product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
               </FadeInSection>
             ))}
          </div>
        </div>
      </section>

      {/* Series 03 - Essentials */}
      <section id="handbags" className="py-24 bg-[#F8F7F4]/30 scroll-mt-16">
        <div className="container mx-auto px-6">
          <FadeInSection className="mb-16 flex justify-between items-end">
             <div className="space-y-3">
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Series 03</span>
               <h2 className="text-4xl font-black uppercase tracking-tighter">Essentials.</h2>
             </div>
             <p className="text-sm font-medium italic serif text-gray-400 max-w-[240px]">The definitive daily companion.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {MOCK_PRODUCTS.filter(p => p.category === 'Handbags').slice(0, 4).map((p) => (
               <FadeInSection key={p.id}>
                  <ProductCard product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
               </FadeInSection>
             ))}
          </div>
        </div>
      </section>

      <FullPageBanner 
        image="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=2400"
        accent="Horizon Discovery"
        title="Artifacts for Distant Horizons"
        subtitle="Designed for those who view travel as a narrative. Every stitch in our leather carry-alls tells a story of artisanal heritage and future exploration."
        reverse={false}
      />

      {/* Series 04 - After Hours */}
      <section id="evening" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-6">
          <FadeInSection className="mb-16 text-right flex flex-row-reverse justify-between items-end">
             <div className="space-y-3">
               <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em]">Series 04</span>
               <h2 className="text-4xl font-black uppercase tracking-tighter">After Hours.</h2>
             </div>
             <p className="text-sm font-medium italic serif text-gray-400 max-w-[240px]">Crafted for moonlit encounters.</p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {MOCK_PRODUCTS.filter(p => p.category === 'Fancy').slice(0, 4).map((p) => (
               <FadeInSection key={p.id}>
                  <ProductCard product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
               </FadeInSection>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
