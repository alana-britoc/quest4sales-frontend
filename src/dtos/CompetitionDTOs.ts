export type CompetitionStatus = "PLANEJADA" | "ATIVA" | "ENCERRADA" | "CANCELADA";

export interface Competition {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: CompetitionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompetitionRequest {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status?: CompetitionStatus;
}

export interface UpdateCompetitionRequest {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: CompetitionStatus;
}
