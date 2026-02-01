import { Star, Check } from 'lucide-react';
import { useState } from 'react';

interface RatingControlProps {
  currentRating?: number;
  isRated: boolean;
  onRate: (value: number) => void;
}

export function RatingControl({ currentRating, isRated, onRate }: RatingControlProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleRate = (value: number) => {
    if (!isRated) {
      onRate(value);
    }
  };

  // If already rated, show the rating result
  if (isRated && currentRating) {
    return (
      <div className="flex items-center justify-between py-2.5 px-3 bg-green-50/80 rounded-xl border border-green-100">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
          <span className="text-xs font-semibold text-green-700">
            Bewertet
          </span>
        </div>
        {/* Stars in a row - same height */}
        <div className="flex items-center h-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 flex-shrink-0 ${
                star <= currentRating
                  ? 'fill-green-500 text-green-500'
                  : 'fill-slate-200 text-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Interactive rating control - optimized for mobile
  return (
    <div 
      className="flex items-center justify-center py-2"
      role="radiogroup"
      aria-label="Bewertung auswählen"
    >
      {/* Stars container - fixed height, inline flex */}
      <div className="inline-flex items-center h-10 bg-slate-50 rounded-xl px-2">
        {[1, 2, 3, 4, 5].map((value) => {
          const isHovered = hoverRating !== null && value <= hoverRating;
          const isActive = currentRating !== undefined && value <= currentRating;
          
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={currentRating === value}
              aria-label={`${value} von 5 Sternen`}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 transition-all active:scale-90 touch-manipulation"
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(null)}
              onTouchStart={() => setHoverRating(value)}
              onTouchEnd={() => {
                handleRate(value);
                setHoverRating(null);
              }}
              onClick={() => handleRate(value)}
              disabled={isRated}
            >
              <Star
                className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-all duration-150 ${
                  isHovered || isActive
                    ? 'fill-amber-400 text-amber-400 scale-110'
                    : 'fill-transparent text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
