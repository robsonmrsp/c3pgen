import axios from "axios";
const getServices = async () => {
  const response = await axios.get("/api/grocery-2/services");
  return response.data;
};
const getCategories = async () => {
  const response = await axios.get("/api/grocery-2/categories");
  return response.data;
};
const getDiscountBannerList = async () => {
  const response = await axios.get("/api/grocery-2/discount-card-list");
  return response.data;
};
const getNavigationList = async () => {
  const response = await axios.get("/api/grocery-2/category-navigation");
  return response.data;
};
const getFeaturedProducts = async () => {
  const response = await axios.get("/api/grocery-2/featured-products");
  return response.data;
};
const getBestSellProducts = async () => {
  const response = await axios.get("/api/grocery-2/best-sell-products");
  return response.data;
};
const getBestHomeProducts = async () => {
  const response = await axios.get("/api/grocery-2/home-essentials-products");
  return response.data;
};
const getDairyProducts = async () => {
  const response = await axios.get("/api/grocery-2/more-products");
  return response.data;
};
const getTestimonials = async () => {
  const response = await axios.get("/api/grocery-2/testimonial-list");
  return response.data;
};
const getMainCarousel = async () => {
  const response = await axios.get("/api/grocery-2/main-carousel");
  return response.data;
};
export default {
  getServices,
  getCategories,
  getTestimonials,
  getMainCarousel,
  getDairyProducts,
  getNavigationList,
  getFeaturedProducts,
  getBestSellProducts,
  getBestHomeProducts,
  getDiscountBannerList,
};
