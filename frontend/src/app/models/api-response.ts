export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  products?: T[];
  orders?: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface OrderFilters {
  status?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}