import requestWebAdmin from "utils/axios";
import { FoodCategory } from "../types/category";
import { BaseReponse } from "types/response";

const getCategories = (brandCode: string) =>
  requestWebAdmin.get<BaseReponse<FoodCategory>>(`brands/categories`, {
    params: { brandCode },
  });

const CategoriesApi = {
  getCategories,
};

export default CategoriesApi;
