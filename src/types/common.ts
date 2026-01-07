export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any;
}
export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  success: boolean;
}
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
