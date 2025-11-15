import { api } from "@/lib/api";
import type {
  Competition,
  CreateCompetitionRequest,
  UpdateCompetitionRequest,
} from "@/dtos/CompetitionDTOs";
import type { Page, PaginationParams } from "@/dtos/PaginationDTOs";

export const competitionService = {
  async getCompetitions(params?: PaginationParams): Promise<Page<Competition>> {
    const { data } = await api.get<Page<Competition>>("/competitions", {
      params,
    });
    return data;
  },

  async getCompetitionById(id: string): Promise<Competition> {
    const { data } = await api.get<Competition>(`/competitions/${id}`);
    return data;
  },

  async createCompetition(
    competitionData: CreateCompetitionRequest
  ): Promise<Competition> {
    const { data } = await api.post<Competition>(
      "/competitions",
      competitionData
    );
    return data;
  },

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

  async deleteCompetition(id: string): Promise<void> {
    await api.delete(`/competitions/${id}`);
  },
};
