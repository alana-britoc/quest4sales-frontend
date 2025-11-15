export interface Score {
  id: string;
  user: {
    id: string;
    username: string;
  };
  competition: {
    id: string;
    name: string;
  };
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScoreRequest {
  userId: string;
  competitionId: string;
  points: number;
}
