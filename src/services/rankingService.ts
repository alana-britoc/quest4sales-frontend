import { api } from "@/lib/api";
import type { Ranking } from "@/dtos/RankingDTOs";

export const rankingService = {
  /**
   * Busca o ranking completo de uma competição
   */
  async getRankingsByCompetition(competitionId: string): Promise<Ranking[]> {
    const { data } = await api.get<Ranking[]>(
      `/ranking/competition/${competitionId}`
    );
    return data;
  },

  /**
   * Busca o top N do ranking de uma competição
   */
  async getTopRanking(competitionId: string, limit: number = 10): Promise<Ranking[]> {
    const { data } = await api.get<Ranking[]>(
      `/ranking/competition/${competitionId}/top`,
      { params: { limit } }
    );
    return data;
  },

  /**
   * Busca o ranking de um usuário específico em uma competição
   */
  async getUserRanking(competitionId: string, userId: string): Promise<Ranking> {
    const { data } = await api.get<Ranking>(
      `/ranking/competition/${competitionId}/user/${userId}`
    );
    return data;
  },

  /**
   * Busca a posição de um usuário no ranking
   */
  async getUserPosition(competitionId: string, userId: string): Promise<number> {
    const { data } = await api.get<{ position: number }>(
      `/ranking/competition/${competitionId}/user/${userId}/position`
    );
    return data.position;
  },

  /**
   * Busca as posições ao redor de um usuário no ranking
   * @param range - Número de posições acima e abaixo para retornar (padrão: 2)
   */
  async getRankingAroundUser(
    competitionId: string,
    userId: string,
    range: number = 2
  ): Promise<Ranking[]> {
    const { data } = await api.get<Ranking[]>(
      `/ranking/competition/${competitionId}/around-user/${userId}`,
      { params: { range } }
    );
    return data;
  },
};
