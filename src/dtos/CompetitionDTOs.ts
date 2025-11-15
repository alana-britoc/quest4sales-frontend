export interface Competition {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "PENDING" | "FINISHED";
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompetitionRequest {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}

export interface UpdateCompetitionRequest {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: "ACTIVE" | "PENDING" | "FINISHED";
}
