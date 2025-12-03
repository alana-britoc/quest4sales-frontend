import { api } from "@/lib/api";
import type {
  Competition,
  CreateCompetitionRequest,
  UpdateCompetitionRequest,
  CompetitionStatus,
} from "@/dtos/CompetitionDTOs";

export const competitionService = {
  /**
   * Lista todas as competições (retorna List, não Page)
   */
  async getCompetitions(): Promise<Competition[]> {
    const { data } = await api.get<Competition[]>("/competitions");
    return data;
  },

  /**
   * Busca competição por ID
   */
  async getCompetitionById(id: string): Promise<Competition> {
    const { data } = await api.get<Competition>(`/competitions/${id}`);
    return data;
  },

  /**
   * Busca competições ativas
   */
  async getActiveCompetitions(): Promise<Competition[]> {
    const { data } = await api.get<Competition[]>("/competitions/active");
    return data;
  },

  /**
   * Cria uma nova competição
   */
  async createCompetition(
    competitionData: CreateCompetitionRequest
  ): Promise<Competition> {
    const { data } = await api.post<Competition>(
      "/competitions",
      competitionData
    );
    return data;
  },

  /**
   * Atualiza uma competição
   */
  async updateCompetition(
    id: string,
    competitionData: UpdateCompetitionRequest
  ): Promise<Competition> {
    const { data } = await api.put<Competition>(
      `/competitions/${id}`,
      competitionData
    );
    return data;
  },

  /**
   * Inicia uma competição
   */
  async startCompetition(id: string): Promise<Competition> {
    const { data } = await api.put<Competition>(`/competitions/${id}/start`);
    return data;
  },

  /**
   * Finaliza uma competição
   */
  async finishCompetition(id: string): Promise<Competition> {
    const { data } = await api.put<Competition>(`/competitions/${id}/finish`);
    return data;
  },

  /**
   * Atualiza o status de uma competição
   * Status disponíveis: PLANEJADA, ATIVA, ENCERRADA, CANCELADA
   */
  async updateStatus(
    id: string,
    status: CompetitionStatus
  ): Promise<Competition> {
    const { data } = await api.put<Competition>(
      `/competitions/${id}/status`,
      null,
      { params: { status } }
    );
    return data;
  },

  /**
   * Deleta uma competição
   */
  async deleteCompetition(id: string): Promise<void> {
    await api.delete(`/competitions/${id}`);
  },
};
