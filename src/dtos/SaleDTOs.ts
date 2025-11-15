export interface Sale {
  id: string;
  user: {
    id: string;
    username: string;
  };
  amount: number;
  quantity: number;
  positiveSale: boolean;
  travelQuantity: number;
  saleDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSaleRequest {
  amount: number;
  quantity: number;
  positiveSale: boolean;
  travelQuantity: number;
  saleDate: string;
}
