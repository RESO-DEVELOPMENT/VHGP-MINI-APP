export interface FoodCategory {
  id: string;
  code: string;
  name: string;
  type: string;
  displayOrder: number;
  description: string;
  picUrl?: string;
  status: string;
  brandId: string;
}

export interface FoodCategoryResponse {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: FoodCategory[];
}
