import axios from "axios";
const getAddressList = async () => {
  const response = await axios.get("/api/address/user");
  return response.data;
};
const getIds = async () => {
  const response = await axios.get("/api/address/address-ids");
  return response.data;
};
const getAddress = async (id) => {
  const response = await axios.get("/api/address/user/1", {
    params: {
      id,
    },
  });
  return response.data;
};
export default {
  getAddressList,
  getIds,
  getAddress,
};
