import requestWebAdmin from "utils/axios";
import { FoodCategoryResponse } from "../types/category";

const getCategories = (brandCode: string) =>
  requestWebAdmin.get<FoodCategoryResponse>(`brands/categories`, {
    params: { brandCode },
  });

const CategoriesApi = {
  getCategories,
};

export default CategoriesApi;
