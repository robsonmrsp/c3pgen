import axios from "axios";
const getAllProductReviews = async () => {
  const response = await axios.get("/api/vendor/product-reviews");
  return response.data;
};
const getAllRefundRequests = async () => {
  const response = await axios.get("/api/vendor/refund-requests");
  return response.data;
};
const getAllPayoutRequests = async () => {
  const response = await axios.get("/api/vendor/payout-requests");
  return response.data;
};
export default {
  getAllProductReviews,
  getAllRefundRequests,
  getAllPayoutRequests,
};
