import { useState, useEffect, useCallback } from 'react';

export interface Comment {
  id: string;
  imageId: string;
  text: string;
  author: string;
  timestamp: number;
  outfitLink?: string; // Optional Zalando/other link
}

const COMMENTS_KEY = 'luna-comments-v1';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load comments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMMENTS_KEY);
      if (stored) {
        setComments(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save comments to localStorage
  const saveComments = useCallback((newComments: Comment[]) => {
    try {
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(newComments));
      setComments(newComments);
    } catch (error) {
      console.error('Failed to save comments:', error);
    }
  }, []);

  // Add a new comment
  const addComment = useCallback((imageId: string, text: string, author: string, outfitLink?: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      imageId,
      text,
      author: author || 'Anonym',
      timestamp: Date.now(),
      outfitLink: outfitLink?.trim() || undefined,
    };
    
    const newComments = [...comments, newComment];
    saveComments(newComments);
    return newComment;
  }, [comments, saveComments]);

  // Get comments for a specific image
  const getCommentsForImage = useCallback((imageId: string) => {
    return comments
      .filter(c => c.imageId === imageId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [comments]);

  // Get all comments
  const getAllComments = useCallback(() => {
    return [...comments].sort((a, b) => b.timestamp - a.timestamp);
  }, [comments]);

  // Delete a comment
  const deleteComment = useCallback((commentId: string) => {
    const newComments = comments.filter(c => c.id !== commentId);
    saveComments(newComments);
  }, [comments, saveComments]);

  // Export all data as JSON
  const exportData = useCallback(() => {
    return {
      comments,
      exportedAt: new Date().toISOString(),
      totalComments: comments.length,
    };
  }, [comments]);

  // Clear all comments
  const clearAllComments = useCallback(() => {
    saveComments([]);
  }, [saveComments]);

  return {
    comments,
    isLoaded,
    addComment,
    getCommentsForImage,
    getAllComments,
    deleteComment,
    exportData,
    clearAllComments,
  };
}
