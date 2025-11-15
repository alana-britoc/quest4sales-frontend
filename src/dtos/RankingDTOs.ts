export interface Ranking {
  id: string;
  competition: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  totalPoints: number;
  position: number;
  updatedAt: string;
}

export interface RankingResponse {
  rankings: Ranking[];
  userRanking?: Ranking;
}
