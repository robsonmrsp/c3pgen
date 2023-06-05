// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import { orders } from "./data";
Mock.onGet("/api/users/orders").reply(async () => {
  try {
    return [200, orders];
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
Mock.onGet("/api/users/order-ids").reply(async () => {
  try {
    const ids = orders.map((item) => ({
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
Mock.onGet("/api/users/order").reply(async (config) => {
  try {
    if (config?.params?.id) {
      const order = orders.find((item) => item.id === config.params.id);
      return [200, order];
    }
    return [200, orders[0]];
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
