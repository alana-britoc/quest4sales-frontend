import { api } from "@/lib/api";
import type { Score, CreateScoreRequest } from "@/dtos/ScoreDTOs";

export const scoreService = {
  async getScores(): Promise<Score[]> {
    const { data } = await api.get<Score[]>("/scores");
    return data;
  },

  async getScoreById(id: string): Promise<Score> {
    const { data } = await api.get<Score>(`/scores/${id}`);
    return data;
  },

  async getScoresByUser(userId: string): Promise<Score[]> {
    const { data } = await api.get<Score[]>(`/scores/user/${userId}`);
    return data;
  },

  async getScoresByCompetition(competitionId: string): Promise<Score[]> {
    const { data } = await api.get<Score[]>(`/scores/competition/${competitionId}`);
    return data;
  },

  async createScore(scoreData: CreateScoreRequest): Promise<Score> {
    const { data } = await api.post<Score>("/scores", scoreData);
    return data;
  },
};
