import type { ImageItem, Setting, HotnessLevel } from '@/types';
import { ImageCard } from '@/components/ImageCard';
import { CheckCircle, Camera, Building2, LayoutGrid, Flame } from 'lucide-react';
import { useState, useMemo } from 'react';
import { styleConfig } from '@/data/mockImages';
import type { Comment } from '@/hooks/useComments';

interface GalleryProps {
  images: ImageItem[];
  ratings: { [key: string]: number };
  onRate: (imageId: string, value: number) => void;
  totalRatings: number;
  totalImages: number;
  comments: Comment[];
  onAddComment: (imageId: string, text: string, author: string, outfitLink?: string) => void;
}

type SettingFilter = 'all' | Setting;
type HotnessFilter = 'all' | HotnessLevel;

export function Gallery({ images, ratings, onRate, totalRatings, totalImages, comments, onAddComment }: GalleryProps) {
  const [settingFilter, setSettingFilter] = useState<SettingFilter>('all');
  const [hotnessFilter, setHotnessFilter] = useState<HotnessFilter>('all');
  
  const filteredImages = useMemo(() => {
    let result = images;
    
    if (settingFilter !== 'all') {
      result = result.filter(img => img.setting === settingFilter);
    }
    
    if (hotnessFilter !== 'all') {
      result = result.filter(img => img.hotness === hotnessFilter);
    }
    
    return result;
  }, [images, settingFilter, hotnessFilter]);

  const allRated = totalRatings === totalImages && totalImages > 0;

  // Count images per category
  const settingCounts = useMemo(() => ({
    all: images.length,
    'studio-grey': images.filter(img => img.setting === 'studio-grey').length,
    'luxury-interior': images.filter(img => img.setting === 'luxury-interior').length,
  }), [images]);

  const hotnessCounts = useMemo(() => {
    const counts: Record<HotnessLevel | 'all', number> = { 
      all: images.length, 
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0 
    };
    images.forEach(img => counts[img.hotness]++);
    return counts;
  }, [images]);

  const hotnessOptions: { value: HotnessFilter; label: string; color: string }[] = [
    { value: 'all', label: 'Alle Styles', color: '#64748B' },
    { value: 1, label: styleConfig.conservative.labelDE, color: styleConfig.conservative.color },
    { value: 2, label: styleConfig.clean.labelDE, color: styleConfig.clean.color },
    { value: 3, label: styleConfig.business.labelDE, color: styleConfig.business.color },
    { value: 4, label: styleConfig.elegant.labelDE, color: styleConfig.elegant.color },
    { value: 5, label: styleConfig.hot.labelDE, color: styleConfig.hot.color },
  ];

  return (
    <section id="gallery" className="section-padding py-16 sm:py-20 bg-white relative">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-10">
        <div className="flex flex-col gap-6">
          {/* Title & Progress Row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[hsl(var(--ios-dark))] mb-2">
                Galerie
              </h2>
              <p className="text-sm text-[hsl(var(--ios-gray))]">
                {filteredImages.length} Outfits warten auf deine Bewertung
              </p>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex-1 sm:w-48 h-2 bg-[hsl(var(--ios-light-gray))] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[hsl(var(--ios-blue))] rounded-full transition-all duration-500"
                  style={{ width: `${(totalRatings / totalImages) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-[hsl(var(--ios-dark))]">
                {totalRatings}/{totalImages}
              </span>
            </div>
          </div>

          {/* Setting Filter (Studio/Interior) */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSettingFilter('all')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                settingFilter === 'all' 
                  ? 'bg-[hsl(var(--ios-dark))] text-white shadow-lg' 
                  : 'bg-[hsl(var(--ios-light-gray))] text-[hsl(var(--ios-gray))] hover:bg-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Alle</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                settingFilter === 'all' ? 'bg-white/20' : 'bg-slate-300/50'
              }`}>
                {settingCounts.all}
              </span>
            </button>
            <button
              onClick={() => setSettingFilter('studio-grey')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                settingFilter === 'studio-grey' 
                  ? 'bg-[hsl(var(--ios-dark))] text-white shadow-lg' 
                  : 'bg-[hsl(var(--ios-light-gray))] text-[hsl(var(--ios-gray))] hover:bg-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Studio</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                settingFilter === 'studio-grey' ? 'bg-white/20' : 'bg-slate-300/50'
              }`}>
                {settingCounts['studio-grey']}
              </span>
            </button>
            <button
              onClick={() => setSettingFilter('luxury-interior')}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                settingFilter === 'luxury-interior' 
                  ? 'bg-[hsl(var(--ios-dark))] text-white shadow-lg' 
                  : 'bg-[hsl(var(--ios-light-gray))] text-[hsl(var(--ios-gray))] hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Interior</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                settingFilter === 'luxury-interior' ? 'bg-white/20' : 'bg-slate-300/50'
              }`}>
                {settingCounts['luxury-interior']}
              </span>
            </button>
          </div>

          {/* Hotness/Style Filter - Scrollable on mobile */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] sm:text-xs font-medium text-[hsl(var(--ios-gray))] uppercase tracking-wide">
                Style-Level
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap">
              {hotnessOptions.map((option) => {
                const count = hotnessCounts[option.value];
                const isActive = hotnessFilter === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setHotnessFilter(option.value)}
                    disabled={count === 0 && option.value !== 'all'}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium
                      transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                      ${isActive 
                        ? 'text-white shadow-lg' 
                        : 'bg-[hsl(var(--ios-light-gray))] hover:bg-slate-200'
                      }
                    `}
                    style={isActive ? { backgroundColor: option.color } : {}}
                  >
                    {option.value !== 'all' && (
                      <div className="flex gap-0.5">
                        {[...Array(option.value as number)].map((_, i) => (
                          <Flame key={i} className={`w-2.5 h-2.5 ${isActive ? 'text-white fill-white/80' : 'text-orange-400 fill-orange-400'}`} />
                        ))}
                      </div>
                    )}
                    <span style={!isActive ? { color: option.color } : {}}>{option.label}</span>
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20' : 'bg-slate-300/50 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* All Rated Badge */}
        {allRated && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 animate-fade-in-up">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Alle Outfits bewertet!
            </span>
          </div>
        )}
      </div>

      {/* Image Grid - Optimized for Portrait 9:16 */}
      <div className="max-w-7xl mx-auto">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredImages.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                isRated={image.id in ratings}
                currentRating={ratings[image.id]}
                onRate={onRate}
                index={index}
                comments={comments.filter(c => c.imageId === image.id)}
                onAddComment={onAddComment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">Keine Outfits in dieser Kategorie</p>
            <button 
              onClick={() => { setSettingFilter('all'); setHotnessFilter('all'); }}
              className="mt-4 text-sm text-blue-500 hover:text-blue-600"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
