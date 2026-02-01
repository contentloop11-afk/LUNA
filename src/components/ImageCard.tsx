import type { ImageItem } from '@/types';
import { RatingControl } from './RatingControl';
import { CommentSection } from './CommentSection';
import { styleConfig } from '@/data/mockImages';
import { Flame } from 'lucide-react';
import type { Comment } from '@/hooks/useComments';

interface ImageCardProps {
  image: ImageItem;
  isRated: boolean;
  currentRating?: number;
  onRate: (imageId: string, value: number) => void;
  index: number;
  comments: Comment[];
  onAddComment: (imageId: string, text: string, author: string, outfitLink?: string) => void;
}

export function ImageCard({ 
  image, 
  isRated, 
  currentRating, 
  onRate, 
  index,
  comments,
  onAddComment,
}: ImageCardProps) {
  const handleRate = (value: number) => {
    onRate(image.id, value);
  };

  const config = styleConfig[image.style];

  return (
    <article 
      className="apple-card overflow-hidden animate-fade-in-up opacity-0"
      style={{ 
        animationDelay: `${0.05 + index * 0.03}s`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Image Container - 9:16 Portrait */}
      <div className="image-container relative group">
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        
        {/* Style Badge with Hotness Indicator - Mobile optimized */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-10 flex items-center justify-between gap-2">
          <span 
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold text-white backdrop-blur-md shadow-lg truncate"
            style={{ backgroundColor: `${config.color}dd` }}
          >
            {config.labelDE}
          </span>
          
          {/* Hotness Flames - Compact on mobile */}
          <div className="flex items-center gap-0 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-black/40 backdrop-blur-md flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Flame 
                key={i} 
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-colors ${
                  i < image.hotness 
                    ? 'text-orange-400 fill-orange-400' 
                    : 'text-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content - Compact padding on mobile */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="font-semibold text-xs sm:text-sm text-slate-900 mb-1.5 sm:mb-2 line-clamp-1">
          {image.title}
        </h3>

        {/* Tags - Scrollable on mobile */}
        <div className="flex gap-1 sm:gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
          {image.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="tag-pill text-[9px] sm:text-[10px] whitespace-nowrap flex-shrink-0"
            >
              {tag}
            </span>
          ))}
          {image.tags.length > 3 && (
            <span className="tag-pill text-[9px] sm:text-[10px] opacity-60 flex-shrink-0">
              +{image.tags.length - 3}
            </span>
          )}
        </div>

        {/* Rating Control - Stars in a row */}
        <RatingControl
          currentRating={currentRating}
          isRated={isRated}
          onRate={handleRate}
        />

        {/* Comment Section */}
        <CommentSection
          imageId={image.id}
          comments={comments}
          onAddComment={onAddComment}
        />
      </div>
    </article>
  );
}
