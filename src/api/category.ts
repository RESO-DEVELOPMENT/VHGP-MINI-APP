import requestWebAdmin from "utils/axios";
import { FoodCategory } from "../types/category";

const getCategories = (brandCode: string) =>
  requestWebAdmin.get<FoodCategory[]>(`brands/categories`, {
    params: { brandCode },
  });

const CategoriesApi = {
  getCategories,
};

export default CategoriesApi;
