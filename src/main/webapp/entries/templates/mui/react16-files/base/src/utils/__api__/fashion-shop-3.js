import axios from "axios";
const getProducts = async () => {
  const response = await axios.get("/api/fashion-shop-3/products");
  return response.data;
};
const getFeatureProducts = async () => {
  const response = await axios.get("/api/fashion-shop-3/products?tag=feature");
  return response.data;
};
const getMainCarouselData = async () => {
  const response = await axios.get("/api/fashion-shop-3/main-carousel");
  return response.data;
};
const getServices = async () => {
  const response = await axios.get("/api/fashion-shop-3/services");
  return response.data;
};
const getBlogs = async () => {
  const response = await axios.get("/api/fashion-shop-3/blogs");
  return response.data;
};
export default {
  getProducts,
  getFeatureProducts,
  getMainCarouselData,
  getServices,
  getBlogs,
};
