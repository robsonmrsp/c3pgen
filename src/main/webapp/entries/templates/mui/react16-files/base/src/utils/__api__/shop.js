import axios from "axios";
export const getShopList = async () => {
  const response = await axios.get("/api/shops");
  return response.data;
};
export const getSlugs = async () => {
  const response = await axios.get("/api/shops/slugs");
  return response.data;
};
export const getProductsBySlug = async (slug) => {
  const response = await axios.get("/api/shops/single", {
    params: {
      slug,
    },
  });
  return response.data;
};
export default {
  getShopList,
  getSlugs,
  getProductsBySlug,
};
