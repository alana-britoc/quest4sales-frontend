import { api } from "@/lib/api";
import type { Sale, CreateSaleRequest } from "@/dtos/SaleDTOs";
import type { Page, PaginationParams } from "@/dtos/PaginationDTOs";

export const salesService = {
  async getSales(params?: PaginationParams): Promise<Page<Sale>> {
    const { data } = await api.get<Page<Sale>>("/sales", { params });
    return data;
  },

  async getSaleById(id: string): Promise<Sale> {
    const { data } = await api.get<Sale>(`/sales/${id}`);
    return data;
  },

  async getSalesByUser(
    userId: string,
    params?: PaginationParams
  ): Promise<Page<Sale>> {
    const { data } = await api.get<Page<Sale>>(`/sales/user/${userId}`, {
      params,
    });
    return data;
  },

  async getSalesByPeriod(
    start: string,
    end: string,
    params?: PaginationParams
  ): Promise<Page<Sale>> {
    const { data } = await api.get<Page<Sale>>("/sales/period", {
      params: { ...params, start, end },
    });
    return data;
  },

  async getSalesByUserAndPeriod(
    userId: string,
    start: string,
    end: string,
    params?: PaginationParams
  ): Promise<Page<Sale>> {
    const { data } = await api.get<Page<Sale>>(
      `/sales/user/${userId}/period`,
      {
        params: { ...params, start, end },
      }
    );
    return data;
  },

  async getTotalSalesByUser(
    userId: string,
    start?: string,
    end?: string
  ): Promise<number> {
    const { data } = await api.get<number>(`/sales/user/${userId}/total`, {
      params: { start, end },
    });
    return data;
  },

  async createSale(saleData: CreateSaleRequest): Promise<Sale> {
    const { data} = await api.post<Sale>("/sales", saleData);
    return data;
  },

  async createSaleForUser(
    userId: string,
    saleData: CreateSaleRequest
  ): Promise<Sale> {
    const { data } = await api.post<Sale>(`/sales/user/${userId}`, saleData);
    return data;
  },
};
