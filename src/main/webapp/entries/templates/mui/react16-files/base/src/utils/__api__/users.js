import axios from "axios";
export const getUser = async () => {
  const response = await axios.get("/api/user-list/1");
  return response.data;
};
export const getUserIds = async () => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};
export default {
  getUser,
  getUserIds,
};
