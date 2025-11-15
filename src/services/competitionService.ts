import { api } from "@/lib/api";
import type { Competition, Prize, PodiumItem } from "@/dtos/CompetitionDTOs";

export const competitionService = {
  async getActiveCompetition(): Promise<Competition> {
    const { data } = await api.get<Competition>("/competitions/active");
    return data;
  },

  async getCompetitionById(id: number): Promise<Competition> {
    const { data } = await api.get<Competition>(`/competitions/${id}`);
    return data;
  },

  async getCompetitionPrize(competitionId: number): Promise<Prize> {
    const { data } = await api.get<Prize>(
      `/competitions/${competitionId}/prize`
    );
    return data;
  },

  async getPodium(competitionId: number): Promise<PodiumItem[]> {
    const { data } = await api.get<PodiumItem[]>(
      `/competitions/${competitionId}/podium`
    );
    return data;
  },
};
