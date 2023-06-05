import axios from "axios";
const getNavigation = async () => {
  const response = await axios.get("/api/health-beauty/navigation");
  return response.data;
};
const getTopNewProducts = async () => {
  const response = await axios.get("/api/health-beauty/products?tag=new");
  return response.data;
};
const getProducts = async () => {
  const response = await axios.get("/api/health-beauty/products");
  return response.data;
};
const getServices = async () => {
  const response = await axios.get("/api/health-beauty/services");
  return response.data;
};
const getMainCarousel = async () => {
  const response = await axios.get("/api/health-beauty/main-carousel");
  return response.data;
};
export default {
  getProducts,
  getServices,
  getNavigation,
  getTopNewProducts,
  getMainCarousel,
};
