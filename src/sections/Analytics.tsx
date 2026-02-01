import { ResultsChart } from '@/components/ResultsChart';
import type { ChartDataPoint } from '@/types';
import { Lock, Star, Trophy, TrendingUp } from 'lucide-react';
import { mockImages, styleConfig } from '@/data/mockImages';
import { useMemo } from 'react';

interface AnalyticsProps {
  chartData: ChartDataPoint[];
  totalRatings: number;
  ratings: { [key: string]: number };
}

export function Analytics({ chartData, totalRatings, ratings }: AnalyticsProps) {
  const isUnlocked = totalRatings > 0;

  // Get top rated images
  const topRatedImages = useMemo(() => {
    const ratedImages = mockImages
      .filter(img => ratings[img.id] !== undefined)
      .map(img => ({
        ...img,
        rating: ratings[img.id]
      }))
      .sort((a, b) => b.rating - a.rating);
    
    return ratedImages.slice(0, 3);
  }, [ratings]);

  // Calculate style breakdown (how many of each style got high ratings)
  const styleBreakdown = useMemo(() => {
    const breakdown: { style: string; highRatings: number; totalRated: number; color: string }[] = [];
    
    Object.entries(styleConfig).forEach(([style, config]) => {
      const imagesOfStyle = mockImages.filter(img => img.style === style);
      const ratedOfStyle = imagesOfStyle.filter(img => ratings[img.id] !== undefined);
      const highRated = ratedOfStyle.filter(img => ratings[img.id] >= 4).length;
      
      if (ratedOfStyle.length > 0) {
        breakdown.push({
          style: config.labelDE,
          highRatings: highRated,
          totalRated: ratedOfStyle.length,
          color: config.color
        });
      }
    });
    
    return breakdown.sort((a, b) => b.highRatings - a.highRatings);
  }, [ratings]);

  return (
    <section className="section-padding py-16 sm:py-20 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
            Ergebnisse
          </h2>
          <p className="text-sm text-slate-500">
            Wie werden die Outfits bewertet?
          </p>
        </div>

        {/* Main Chart */}
        <div className="relative mb-8">
          {!isUnlocked && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <Lock className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Bewerte ein Outfit um die Ergebnisse zu sehen
              </p>
            </div>
          )}
          
          <ResultsChart 
            data={chartData} 
            totalRatings={totalRatings} 
          />
        </div>

        {/* Additional Insights - Only when enough ratings */}
        {totalRatings >= 3 && (
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Top Rated Outfits */}
            <div className="apple-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold text-slate-900">Top bewertet</h3>
              </div>
              
              <div className="space-y-3">
                {topRatedImages.length > 0 ? (
                  topRatedImages.map((img, index) => (
                    <div key={img.id} className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={img.src} 
                          alt={img.title}
                          className="w-12 h-16 rounded-lg object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">1</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{img.title}</p>
                        <p className="text-xs text-slate-500">{styleConfig[img.style].labelDE}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < img.rating 
                                ? 'text-amber-400 fill-amber-400' 
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 text-center py-4">
                    Noch keine Top-Bewertungen
                  </p>
                )}
              </div>
            </div>

            {/* Style Insights */}
            <div className="apple-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-slate-900">Beliebte Styles</h3>
              </div>
              
              <div className="space-y-3">
                {styleBreakdown.length > 0 ? (
                  styleBreakdown.map((item) => (
                    <div key={item.style} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-900">
                            {item.style}
                          </span>
                          <span className="text-xs text-slate-500">
                            {item.highRatings}/{item.totalRated} gut bewertet
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(item.highRatings / item.totalRated) * 100}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 text-center py-4">
                    Bewerte mehr Outfits für Style-Insights
                  </p>
                )}
              </div>
              
              <p className="text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                "Gut bewertet" = 4 oder 5 Sterne
              </p>
            </div>
          </div>
        )}

        {/* Call to Action when few ratings */}
        {totalRatings > 0 && totalRatings < 3 && (
          <div className="text-center mt-8 p-6 bg-blue-50 rounded-2xl">
            <p className="text-sm text-blue-700">
              <strong>Noch {3 - totalRatings} Bewertung{3 - totalRatings !== 1 ? 'en' : ''}</strong> bis zu den Detail-Insights!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
