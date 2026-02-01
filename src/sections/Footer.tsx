import { Camera } from 'lucide-react';

export function Footer() {
  return (
    <footer className="section-padding py-10 sm:py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[hsl(var(--ios-blue))] flex items-center justify-center">
              <Camera className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-sm text-[hsl(var(--ios-dark))]">
              RateMyShots
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => alert('Privacy: All ratings are stored locally on your device only.')}
              className="text-xs text-[hsl(var(--ios-gray))] hover:text-[hsl(var(--ios-dark))] transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => alert('Terms: This is a demo application. No data is sent to any server.')}
              className="text-xs text-[hsl(var(--ios-gray))] hover:text-[hsl(var(--ios-dark))] transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
