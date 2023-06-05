import axios from "axios";
const getProducts = async () => {
  const response = await axios.get("/api/market-2/products");
  return response.data;
};
const getServices = async () => {
  const response = await axios.get("/api/market-2/service");
  return response.data;
};
const getCategories = async () => {
  const response = await axios.get("/api/market-2/categories");
  return response.data;
};
const getBrands = async () => {
  const response = await axios.get("/api/market-2/brand");
  return response.data;
};
const getMainCarouselData = async () => {
  const response = await axios.get("/api/market-2/main-carousel");
  return response.data;
};
const getElectronicsProducts = async () => {
  const response = await axios.get(
    "/api/market-2/category-based-product?tag=electronics"
  );
  return response.data;
};
const getMenFashionProducts = async () => {
  const response = await axios.get(
    "/api/market-2/category-based-product?tag=men"
  );
  return response.data;
};
const getWomenFashionProducts = async () => {
  const response = await axios.get(
    "/api/market-2/category-based-product?tag=women"
  );
  return response.data;
};
export default {
  getBrands,
  getProducts,
  getServices,
  getCategories,
  getMainCarouselData,
  getMenFashionProducts,
  getElectronicsProducts,
  getWomenFashionProducts,
};
