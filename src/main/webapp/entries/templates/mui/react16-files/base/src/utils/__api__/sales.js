import axios from "axios";
import products from "data/product-database";
const getCategories = async () => {
  const response = await axios.get("/api/sales-1/categories");
  return response.data;
};
const getCategoriesTwo = async () => {
  const response = await axios.get("/api/sales-2/categories");
  return response.data;
};
const getProducts = async (page = 1) => {
  const PAGE_SIZE = 28;
  const currentProducts = products.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );
  return currentProducts;
};
export default {
  getCategories,
  getProducts,
  getCategoriesTwo,
};
