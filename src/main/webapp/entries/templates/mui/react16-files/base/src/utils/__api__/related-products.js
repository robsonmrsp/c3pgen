import axios from "axios";
export const getFrequentlyBought = async () => {
  const response = await axios.get("/api/frequently-bought-products");
  return response.data;
};
export const getRelatedProducts = async () => {
  const response = await axios.get("/api/related-products");
  return response.data;
};
