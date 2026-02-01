import { useEffect, useRef, useState } from 'react';
import type { ChartDataPoint } from '@/types';
import { BarChart3, TrendingUp, Star } from 'lucide-react';

interface ResultsChartProps {
  data: ChartDataPoint[];
  totalRatings: number;
}

export function ResultsChart({ data, totalRatings }: ResultsChartProps) {
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([0, 0, 0, 0, 0]);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const hasAnimated = useRef(false);

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const maxBarHeight = 180; // Maximum height in pixels

  // Calculate heights based on relative counts (not percentage)
  useEffect(() => {
    if (totalRatings > 0) {
      const heights = data.map(d => 
        d.count > 0 ? Math.max((d.count / maxCount) * maxBarHeight, 20) : 0
      );
      
      if (!hasAnimated.current) {
        setTimeout(() => {
          setAnimatedHeights(heights);
          hasAnimated.current = true;
        }, 100);
      } else {
        setAnimatedHeights(heights);
      }
    }
  }, [data, totalRatings, maxCount]);

  // Calculate average rating
  const avgRating = totalRatings > 0 
    ? (data.reduce((acc, d) => acc + d.rating * d.count, 0) / totalRatings).toFixed(1)
    : '0';

  if (totalRatings === 0) {
    return (
      <div className="apple-card p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-slate-900">Rating-Verteilung</h3>
            <p className="text-xs text-slate-500">Noch keine Bewertungen</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-500">
            Bewerte Outfits um die Verteilung zu sehen
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="apple-card p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-base text-slate-900">Rating-Verteilung</h3>
            <p className="text-xs text-slate-500">{totalRatings} Bewertungen</p>
          </div>
        </div>
        
        {/* Average Rating */}
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <span className="text-2xl font-bold text-slate-900">{avgRating}</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-[10px] text-slate-500">Durchschnitt</p>
        </div>
      </div>

      {/* Bar Chart - Simple CSS-based */}
      <div className="flex items-end justify-between gap-2 sm:gap-3 h-[200px] sm:h-[220px] px-2">
        {data.map((item, index) => {
          const height = animatedHeights[index];
          const isHovered = hoveredBar === item.rating;
          
          return (
            <div 
              key={item.rating}
              className="flex-1 flex flex-col items-center"
              onMouseEnter={() => setHoveredBar(item.rating)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {/* Count Label */}
              <div 
                className={`mb-2 text-xs font-semibold transition-all duration-200 ${
                  item.count > 0 ? 'text-slate-700' : 'text-transparent'
                } ${isHovered ? 'scale-110' : ''}`}
              >
                {item.count}
              </div>
              
              {/* Bar Container */}
              <div className="w-full flex-1 flex items-end">
                <div 
                  className={`w-full rounded-t-xl transition-all duration-500 ease-out cursor-pointer ${
                    item.count > 0 
                      ? isHovered 
                        ? 'bg-blue-500' 
                        : 'bg-blue-400'
                      : 'bg-slate-100'
                  }`}
                  style={{ 
                    height: item.count > 0 ? `${height}px` : '8px',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                />
              </div>
              
              {/* Rating Label */}
              <div className="mt-3 flex flex-col items-center">
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                        isHovered || item.count > 0
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-slate-300 fill-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 pt-4 border-t border-slate-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">
            {data.find(d => d.rating === 5)?.count || 0}
          </p>
          <p className="text-[10px] text-slate-500">5-Sterne</p>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">
            {data.find(d => d.rating === 1)?.count || 0}
          </p>
          <p className="text-[10px] text-slate-500">1-Stern</p>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="text-center">
          <p className="text-lg font-semibold text-blue-500">
            {Math.round((data.filter(d => d.rating >= 4).reduce((a, d) => a + d.count, 0) / totalRatings) * 100)}%
          </p>
          <p className="text-[10px] text-slate-500">positiv (4-5★)</p>
        </div>
      </div>
    </div>
  );
}
