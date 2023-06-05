import axios from "axios";
const getTopRatedProduct = async () => {
  const response = await axios.get("/api/market-1/toprated-product");
  return response.data;
};
const getTopRatedBrand = async () => {
  const response = await axios.get("/api/market-1/toprated-brand");
  return response.data;
};
const getNewArrivalList = async () => {
  const response = await axios.get("/api/market-1/new-arrivals");
  return response.data;
};
const getCarBrands = async () => {
  const response = await axios.get("/api/market-1/car-brand-list");
  return response.data;
};
const getCarList = async () => {
  const response = await axios.get("/api/market-1/car-list");
  return response.data;
};
const getMobileBrands = async () => {
  const response = await axios.get("/api/market-1/mobile-brand-list");
  return response.data;
};
const getMobileShops = async () => {
  const response = await axios.get("/api/market-1/mobile-shop-list");
  return response.data;
};
const getMobileList = async () => {
  const response = await axios.get("/api/market-1/mobile-list");
  return response.data;
};
const getOpticsBrands = async () => {
  const response = await axios.get("/api/market-1/optics/watch-brands");
  return response.data;
};
const getOpticsShops = async () => {
  const response = await axios.get("/api/market-1/optics/watch-shops");
  return response.data;
};
const getOpticsList = async () => {
  const response = await axios.get("/api/market-1/optics-list");
  return response.data;
};
const getCategories = async () => {
  const response = await axios.get("/api/market-1/bottom-categories");
  return response.data;
};
const getMoreItems = async () => {
  const response = await axios.get("/api/market-1/get-more-items");
  return response.data;
};
const getServiceList = async () => {
  const response = await axios.get("/api/market-1/get-service-list");
  return response.data;
};
const getMainCarousel = async () => {
  const response = await axios.get("/api/market-1/main-carousel");
  return response.data;
};
const getFlashDeals = async () => {
  const response = await axios.get("/api/market-1/flash-deals");
  return response.data;
};
const getTopCategories = async () => {
  const response = await axios.get("/api/market-1/top-categories");
  return response.data;
};
const getBigDiscountList = async () => {
  const response = await axios.get("/api/market-1/big-discounts");
  return response.data;
};
export default {
  getCarList,
  getCarBrands,
  getMoreItems,
  getFlashDeals,
  getMobileList,
  getCategories,
  getOpticsList,
  getServiceList,
  getMobileShops,
  getOpticsShops,
  getMainCarousel,
  getMobileBrands,
  getOpticsBrands,
  getTopCategories,
  getTopRatedBrand,
  getNewArrivalList,
  getBigDiscountList,
  getTopRatedProduct,
};
