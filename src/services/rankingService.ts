import { api } from "@/lib/api";
import type { Ranking, RankingResponse } from "@/dtos/RankingDTOs";

export const rankingService = {
  async getRankings(): Promise<Ranking[]> {
    const { data } = await api.get<Ranking[]>("/rankings");
    return data;
  },

  async getRankingsByCompetition(competitionId: string): Promise<RankingResponse> {
    const { data } = await api.get<RankingResponse>(
      `/rankings/competition/${competitionId}`
    );
    return data;
  },
};
