import axios from "axios";
const getTopSailedProducts = async () => {
  const response = await axios.get("/api/grocery-3/products?tag=top-sailed");
  return response.data;
};
const getAllProducts = async () => {
  const response = await axios.get("/api/grocery-3/products");
  return response.data;
};
const getOfferCards = async () => {
  const response = await axios.get("/api/grocery-3/products?tag=offer");
  return response.data;
};
const getMainCarousel = async () => {
  const response = await axios.get("/api/grocery-3/main-carousel");
  return response.data;
};
export default {
  getOfferCards,
  getAllProducts,
  getMainCarousel,
  getTopSailedProducts,
};
