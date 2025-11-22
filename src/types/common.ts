// Common utility types

// Standard API error response
export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any;
}

// Generic API response wrapper
export interface ApiResponse<T = any> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

// Query result with pagination
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
