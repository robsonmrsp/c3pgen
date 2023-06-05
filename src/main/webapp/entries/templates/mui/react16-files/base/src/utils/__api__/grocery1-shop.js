import axios from "axios";
const getGrocery1Navigation = async () => {
  const response = await axios.get("/api/grocery-1/navigation");
  return response.data;
};
const getPopularProducts = async () => {
  const response = await axios.get("/api/grocery-1/products?tag=popular");
  return response.data;
};
const getTrendingProducts = async () => {
  const response = await axios.get("/api/grocery-1/products?tag=trending");
  return response.data;
};
const getProducts = async () => {
  const response = await axios.get("/api/grocery-1/products");
  return response.data;
};
const getServices = async () => {
  const response = await axios.get("/api/grocery-1/services");
  return response.data;
};
export default {
  getServices,
  getProducts,
  getPopularProducts,
  getTrendingProducts,
  getGrocery1Navigation,
};
