import { HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface TopbarProps {
  onAdminClick?: () => void;
}

export function Topbar({ onAdminClick }: TopbarProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Secret admin access: Triple-click on logo
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Reset count after 2 seconds
    setTimeout(() => setClickCount(0), 2000);
    
    // Triple click opens admin
    if (newCount >= 3 && onAdminClick) {
      setClickCount(0);
      onAdminClick();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100/50">
      <div className="section-padding">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - Luna Homes (Triple-click for admin) */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 select-none"
          >
            {/* SVG Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
              <img 
                src="/images/logo.svg" 
                alt="Luna Homes" 
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 leading-none">
                Luna Homes
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight tracking-wider uppercase">
                Style Check
              </span>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            {/* Help Button with Tooltip */}
            <div className="relative">
              <button 
                className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={() => setShowHelp(!showHelp)}
                onBlur={() => setTimeout(() => setShowHelp(false), 200)}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline ml-1.5">Hilfe</span>
              </button>
              
              {/* Help Tooltip */}
              {showHelp && (
                <div className="absolute top-full right-0 mt-2 w-64 p-4 bg-white rounded-xl shadow-xl border border-slate-100 text-left z-50 animate-fade-in-up" style={{ animationDuration: '0.15s' }}>
                  <h4 className="font-semibold text-sm text-slate-900 mb-2">Wie funktioniert's?</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-slate-900 font-bold">1.</span>
                      <span>Scrolle durch Luna's Outfits</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-900 font-bold">2.</span>
                      <span>Bewerte mit 1-5 Sternen (einmalig!)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-900 font-bold">3.</span>
                      <span>Kommentiere & teile Outfit-Links</span>
                    </li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400">
                      Deine Bewertung ist anonym und zählt nur einmal.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
