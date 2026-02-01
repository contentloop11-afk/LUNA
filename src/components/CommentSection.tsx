import { useState } from 'react';
import { MessageCircle, Send, Link2, User, ExternalLink } from 'lucide-react';
import type { Comment } from '@/hooks/useComments';

interface CommentSectionProps {
  imageId: string;
  comments: Comment[];
  onAddComment: (imageId: string, text: string, author: string, outfitLink?: string) => void;
}

export function CommentSection({ imageId, comments, onAddComment }: CommentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [outfitLink, setOutfitLink] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAddComment(imageId, text.trim(), author.trim(), outfitLink.trim());
    setText('');
    setOutfitLink('');
    setShowLinkInput(false);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Gerade eben';
    if (diffMins < 60) return `vor ${diffMins} Min`;
    if (diffHours < 24) return `vor ${diffHours} Std`;
    if (diffDays < 7) return `vor ${diffDays} Tagen`;
    return date.toLocaleDateString('de-DE');
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="border-t border-slate-100 mt-4 pt-4">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors w-full"
      >
        <MessageCircle className="w-4 h-4" />
        <span>
          {comments.length > 0 
            ? `${comments.length} Kommentar${comments.length !== 1 ? 'e' : ''}`
            : 'Kommentieren'
          }
        </span>
      </button>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
          {/* Comment Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Author Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Dein Name (optional)"
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Comment Input */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Schreib einen Kommentar..."
                rows={2}
                className="w-full px-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Link Toggle */}
            <button
              type="button"
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`flex items-center gap-1.5 text-xs ${showLinkInput ? 'text-blue-500' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Outfit-Link hinzufügen (Zalando, etc.)</span>
            </button>

            {/* Link Input */}
            {showLinkInput && (
              <div className="relative animate-fade-in-up" style={{ animationDuration: '0.15s' }}>
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={outfitLink}
                  onChange={(e) => setOutfitLink(e.target.value)}
                  placeholder="https://www.zalando.de/..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-blue-50 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Absenden</span>
            </button>
          </form>

          {/* Comments List */}
          {comments.length > 0 && (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-700">
                      {comment.author}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {formatTime(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {comment.text}
                  </p>
                  
                  {/* Outfit Link */}
                  {comment.outfitLink && isValidUrl(comment.outfitLink) && (
                    <a
                      href={comment.outfitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Outfit ansehen</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
