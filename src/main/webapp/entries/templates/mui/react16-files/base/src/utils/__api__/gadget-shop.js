import axios from "axios";
const getFeaturedCategories = async () => {
  const response = await axios.get("/api/gadget-store/featured-categories");
  return response.data;
};
const getTwoBanner = async () => {
  const response = await axios.get("/api/gadget-store/two-banners");
  return response.data;
};
const getBlogLists = async () => {
  const response = await axios.get("/api/gadget-store/blog-lists");
  return response.data;
};
const getMainCarousel = async () => {
  const response = await axios.get("/api/gadget-store/main-carousel");
  return response.data;
};
const getTopPicksList = async () => {
  const response = await axios.get("/api/gadget-store/products?tag=top-picks");
  return response.data;
};
const getMostViewedList = async () => {
  const response = await axios.get(
    "/api/gadget-store/products?tag=most-viewed"
  );
  return response.data;
};
const getNewArrival = async () => {
  const response = await axios.get(
    "/api/gadget-store/products?tag=new-arrival"
  );
  return response.data;
};
export default {
  getTwoBanner,
  getBlogLists,
  getNewArrival,
  getMainCarousel,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories,
};
