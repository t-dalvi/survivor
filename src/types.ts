export interface Season {
  id: number;
  name: string;
  theme: string;
  location: string;
  year: number;
  isReturnee: boolean;
  spoils: number[]; // IDs of seasons it spoils
  description: string;
}

export interface WatchLog {
  id?: number;
  seasonId: number;
  episodeNumber: number;
  rating: number; // 1-10
  notes: string;
  watchedAt: string;
}

export interface RecommendationRequest {
  type: 'season' | 'episode';
  preferences: string;
  watchedSeasons: number[];
}
