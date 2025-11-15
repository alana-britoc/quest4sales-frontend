export interface ApiErrorResponse {
  status: number;
  message: string;
  timestamp: number;
  path: string;
  details?: Record<string, string>;
}