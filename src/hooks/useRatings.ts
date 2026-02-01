import { useState, useEffect, useCallback } from 'react';
import type { RatingData, RatingDistribution, ChartDataPoint } from '@/types';
import { STORAGE_KEY } from '@/data/mockImages';

export function useRatings() {
  const [ratings, setRatings] = useState<RatingData>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load ratings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRatings(parsed);
      }
    } catch (error) {
      console.error('Failed to load ratings:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save ratings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
      } catch (error) {
        console.error('Failed to save ratings:', error);
      }
    }
  }, [ratings, isLoaded]);

  const setRating = useCallback((imageId: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [imageId]: value
    }));
  }, []);

  const hasRated = useCallback((imageId: string): boolean => {
    return imageId in ratings;
  }, [ratings]);

  const getRating = useCallback((imageId: string): number | undefined => {
    return ratings[imageId];
  }, [ratings]);

  const getTotalRatings = useCallback((): number => {
    return Object.keys(ratings).length;
  }, [ratings]);

  const getRatingDistribution = useCallback((): RatingDistribution => {
    const distribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    Object.values(ratings).forEach(rating => {
      if (rating >= 1 && rating <= 5) {
        distribution[rating as keyof RatingDistribution]++;
      }
    });
    
    return distribution;
  }, [ratings]);

  const getChartData = useCallback((): ChartDataPoint[] => {
    const distribution = getRatingDistribution();
    const total = getTotalRatings();
    
    return [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: distribution[rating as keyof RatingDistribution],
      percentage: total > 0 ? Math.round((distribution[rating as keyof RatingDistribution] / total) * 100) : 0
    }));
  }, [getRatingDistribution, getTotalRatings]);

  const clearAllRatings = useCallback(() => {
    setRatings({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    ratings,
    isLoaded,
    setRating,
    hasRated,
    getRating,
    getTotalRatings,
    getRatingDistribution,
    getChartData,
    clearAllRatings
  };
}
