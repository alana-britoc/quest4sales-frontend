export interface Competition {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "PENDING" | "FINISHED";
}

export interface Prize {
  id: number;
  competitionId: number;
  titulo: string;
  descricao: string;
  dataFim: string;
  imageUrl?: string;
}

export interface PodiumItem {
  position: number;
  name: string;
  total_points: number;
  avatar?: string;
}
