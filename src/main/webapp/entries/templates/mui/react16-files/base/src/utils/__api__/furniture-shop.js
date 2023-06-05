import axios from "axios";
const getTopNewProducts = async () => {
  const response = await axios.get("/api/furniture-shop/products?tag=new");
  return response.data;
};
const getTopSellingProducts = async () => {
  const response = await axios.get(
    "/api/furniture-shop/products?tag=top-selling"
  );
  return response.data;
};
const getFurnitureProducts = async () => {
  const response = await axios.get("/api/furniture-shop/all-products");
  return response.data;
};
const getFurnitureShopNavList = async () => {
  const response = await axios.get("/api/furniture-shop/navigation");
  return response.data;
};
const getMainCarouselData = async () => {
  const response = await axios.get("/api/furniture-shop/main-carousel");
  return response.data;
};
export default {
  getTopNewProducts,
  getMainCarouselData,
  getFurnitureProducts,
  getTopSellingProducts,
  getFurnitureShopNavList,
};
