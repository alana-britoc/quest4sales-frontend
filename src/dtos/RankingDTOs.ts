export interface RankingSeller {
  position: number;
  user_id: number;
  name: string;
  total_points: number;
  avatar?: string;
}

export interface RankingResponse {
  competicao_id: number;
  allSellers: RankingSeller[];
  currentUserPosition?: number;
}
