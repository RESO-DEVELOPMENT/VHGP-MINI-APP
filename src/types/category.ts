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

export type CategoryId =
  | "coffee"
  | "matcha"
  | "food"
  | "milktea"
  | "drinks"
  | "bread"
  | "juice";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
}