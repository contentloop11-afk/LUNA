import { ChevronDown, BarChart3, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { mockImages } from '@/data/mockImages';

interface HeroProps {
  totalRatings: number;
  totalImages: number;
}

export function Hero({ totalRatings, totalImages }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Filter only studio images for consistent marquee look, then duplicate
  const studioImages = mockImages.filter(img => img.setting === 'studio-grey');
  const marqueeImages = [...studioImages, ...studioImages];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/80 via-blue-50/30 via-70% to-white" />
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(ellipse at ${50 + mousePosition.x * 15}% ${30 + mousePosition.y * 10}%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Floating Parallax Blobs */}
      <div className="absolute inset-0 -z-5 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-300/25 to-violet-300/25 blur-[100px]"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20 + scrollY * 0.1}px)`,
          }}
        />
        <div 
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15 - scrollY * 0.08}px)`,
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center pt-24 pb-8 sm:pt-28 sm:pb-12">
        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center z-10 px-4 sm:px-6">
          {/* Live Stats Pill */}
          <div 
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-lg shadow-black/[0.03] border border-white/50 mb-6 sm:mb-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500" />
            <span className="text-[10px] sm:text-xs font-medium text-slate-700">
              {totalRatings} / {totalImages} bewertet
            </span>
          </div>


        {/* Headline with Gradient */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Bewerte Luna's
          </span>
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Outfits.
            </span>
            <Sparkles className="absolute -top-1 -right-5 sm:-top-2 sm:-right-8 w-4 h-4 sm:w-6 sm:h-6 text-amber-400 animate-sparkle" />
          </span>
        </h1>

        {/* Subline */}
        <p 
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-md sm:max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up opacity-0 px-2"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          Hilf uns, den perfekten Look für unsere Immobilien-Beraterin zu finden. 
          <span className="text-amber-600 font-medium"> Welcher Style passt am besten?</span>
        </p>

          {/* CTA Button with Glow */}
          <div 
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <button 
              onClick={scrollToGallery}
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-[length:200%_auto] animate-gradient-x" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                Zur Galerie
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-y-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Gallery Section */}
      <div 
        className="relative pb-8 sm:pb-12 animate-fade-in-up opacity-0"
        style={{ 
          animationDelay: '0.6s', 
          animationFillMode: 'forwards',
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      >
        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        {/* First Marquee Row - Left to Right */}
        <div className="mb-3 sm:mb-4 overflow-hidden">
          <div 
            className="flex gap-3 sm:gap-4 animate-marquee-left"
            style={{
              transform: `translateX(${mousePosition.x * -20}px)`,
            }}
          >
            {marqueeImages.map((image, index) => (
              <div
                key={`row1-${image.id}-${index}`}
                className="relative flex-shrink-0 group cursor-pointer"
                onClick={scrollToGallery}
              >
                <div 
                  className="w-20 h-36 sm:w-28 sm:h-[200px] md:w-32 md:h-[228px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-white"
                  style={{
                    transform: `rotate(${(index % 5 - 2) * 1.5 + mousePosition.x * 2}deg)`,
                  }}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Marquee Row - Right to Left */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-3 sm:gap-4 animate-marquee-right"
            style={{
              transform: `translateX(${mousePosition.x * 20}px)`,
            }}
          >
            {[...marqueeImages].reverse().map((image, index) => (
              <div
                key={`row2-${image.id}-${index}`}
                className="relative flex-shrink-0 group cursor-pointer"
                onClick={scrollToGallery}
              >
                <div 
                  className="w-20 h-36 sm:w-28 sm:h-[200px] md:w-32 md:h-[228px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-white"
                  style={{
                    transform: `rotate(${(index % 5 - 2) * -1.5 + mousePosition.x * -2}deg)`,
                  }}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
