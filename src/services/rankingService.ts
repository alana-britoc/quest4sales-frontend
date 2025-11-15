import { api } from "@/lib/api";
import type { RankingResponse } from "@/dtos/RankingDTOs";

export const rankingService = {
  async getRankingByCompetition(
    competitionId: number
  ): Promise<RankingResponse> {
    const { data } = await api.get<RankingResponse>(
      `/competitions/${competitionId}/ranking`
    );
    return data;
  },
};
