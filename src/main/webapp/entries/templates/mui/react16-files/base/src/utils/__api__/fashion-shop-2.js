import axios from "axios";
const getProducts = async () => {
  const response = await axios.get("/api/fashion-shop-2/products");
  return response.data;
};
const getFeatureProducts = async () => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=feature");
  return response.data;
};
const getSaleProducts = async () => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=sale");
  return response.data;
};
const getPopularProducts = async () => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=popular");
  return response.data;
};
const getLatestProducts = async () => {
  const response = await axios.get("/api/fashion-shop-2/products?tag=latest");
  return response.data;
};
const getBestWeekProducts = async () => {
  const response = await axios.get(
    "/api/fashion-shop-2/products?tag=best-week"
  );
  return response.data;
};
const getBlogs = async () => {
  const response = await axios.get("/api/fashion-shop-2/blogs");
  return response.data;
};
const getServices = async () => {
  const response = await axios.get("/api/fashion-shop-2/service");
  return response.data;
};
const getCategories = async () => {
  const response = await axios.get("/api/fashion-shop-2/category");
  return response.data;
};
const getMainCarouselData = async () => {
  const response = await axios.get("/api/fashion-shop-2/main-carousel");
  return response.data;
};
const getBrands = async () => {
  const response = await axios.get("/api/fashion-shop-2/brands");
  return response.data;
};
export default {
  getBlogs,
  getBrands,
  getProducts,
  getServices,
  getCategories,
  getSaleProducts,
  getLatestProducts,
  getPopularProducts,
  getFeatureProducts,
  getBestWeekProducts,
  getMainCarouselData,
};
