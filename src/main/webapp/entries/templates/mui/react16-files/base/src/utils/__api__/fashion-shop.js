import axios from "axios";
const getFlashDeals = async () => {
  const response = await axios.get("/api/fashion-1/products?tag=flash");
  return response.data;
};
const getNewArrivals = async () => {
  const response = await axios.get("/api/fashion-1/products?tag=new");
  return response.data;
};
const getTrendingItems = async () => {
  const response = await axios.get("/api/fashion-1/products?tag=trending");
  return response.data;
};
const getServiceList = async () => {
  const response = await axios.get("/api/fashion-1/service-list");
  return response.data;
};
const getDealOfTheWeekList = async () => {
  const response = await axios.get("/api/fashion-1/deal-of-the-week");
  return response.data;
};
const getHotDealList = async () => {
  const response = await axios.get("/api/fashion-1/hot-deals");
  return response.data;
};
export default {
  getFlashDeals,
  getNewArrivals,
  getServiceList,
  getHotDealList,
  getTrendingItems,
  getDealOfTheWeekList,
};
