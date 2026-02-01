// Types for the Image Rating Gallery

// Setting - Where the photo was taken
export type Setting = "studio-grey" | "luxury-interior";

// Hotness Level 1-5 for the style scale
export type HotnessLevel = 1 | 2 | 3 | 4 | 5;

// Style categories mapped to hotness levels
export type StyleCategory = "conservative" | "clean" | "business" | "elegant" | "hot";

export interface ImageItem {
  id: string;
  title: string;           // What she's wearing (short)
  src: string;
  tags: string[];          // Detailed clothing items
  setting: Setting;        // studio-grey or luxury-interior
  hotness: HotnessLevel;   // 1-5 scale for chart
  style: StyleCategory;    // Category name
  ratedValue?: number;
}

export interface RatingData {
  [imageId: string]: number;
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ChartDataPoint {
  rating: number;
  count: number;
  percentage: number;
}

export type RatingValue = 1 | 2 | 3 | 4 | 5;

// Style distribution for analytics
export interface StyleDistribution {
  style: StyleCategory;
  hotness: HotnessLevel;
  label: string;
  count: number;
  percentage: number;
  avgRating: number;
}
