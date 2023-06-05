// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import { addressList } from "./data";

// get all users
Mock.onGet("/api/address/user").reply(async () => {
  try {
    return [200, addressList];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// get all user id
Mock.onGet("/api/address/address-ids").reply(async () => {
  try {
    const ids = addressList.map((item) => ({
      params: {
        id: item.id,
      },
    }));
    return [200, ids];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});

// get single user
Mock.onGet("/api/address/user/1").reply(async (config) => {
  try {
    if (config?.params?.id) {
      const address = addressList.find((item) => item.id === config.params.id);
      return [200, address];
    }
    return [200, addressList[0]];
  } catch (err) {
    console.error(err);
    return [
      500,
      {
        message: "Internal server error",
      },
    ];
  }
});
