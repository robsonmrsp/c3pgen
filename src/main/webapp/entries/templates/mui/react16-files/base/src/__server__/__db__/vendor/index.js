// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import { payoutRequests, productReviews, refundRequest } from "./data";
Mock.onGet("/api/vendor/product-reviews").reply(async () => {
  try {
    return [200, productReviews];
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
Mock.onGet("/api/vendor/refund-requests").reply(async () => {
  try {
    return [200, refundRequest];
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
Mock.onGet("/api/vendor/payout-requests").reply(async () => {
  try {
    return [200, payoutRequests];
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
