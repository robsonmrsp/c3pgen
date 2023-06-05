import axios from "axios";
const getMainCarouselData = async () => {
  const response = await axios.get("/api/gift-shop/main-carousel");
  return response.data;
};
const getCategoryNavigation = async () => {
  const response = await axios.get("/api/gift-shop-navigation");
  return response.data;
};
const getPopularProducts = async () => {
  const response = await axios.get("/api/gift-shop/products?tag=popular");
  return response.data;
};
const getTopSailedProducts = async () => {
  const response = await axios.get("/api/gift-shop/products?tag=top-sailed");
  return response.data;
};
const getAllProducts = async () => {
  const response = await axios.get("/api/gift-shop/products");
  return response.data;
};
const getServiceList = async () => {
  const response = await axios.get("/api/gift-shop/service-list");
  return response.data;
};
const getTopCategories = async () => {
  const response = await axios.get("/api/gift-shop/top-categories");
  return response.data;
};
export default {
  getAllProducts,
  getServiceList,
  getTopCategories,
  getPopularProducts,
  getMainCarouselData,
  getTopSailedProducts,
  getCategoryNavigation,
};
