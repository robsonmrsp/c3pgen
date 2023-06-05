import axios from "axios";
const getOrders = async () => {
  const response = await axios.get("/api/users/orders");
  return response.data;
};
const getIds = async () => {
  const response = await axios.get("/api/users/order-ids");
  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get("/api/users/order", {
    params: {
      id,
    },
  });
  return response.data;
};
export default {
  getOrders,
  getOrder,
  getIds,
};
