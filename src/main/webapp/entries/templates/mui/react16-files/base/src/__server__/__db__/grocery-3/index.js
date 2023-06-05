// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import * as db from "./data";
const products = db.products.filter((item) => item.for.type === "all-products");
const topProducts = db.products.filter(
  (item) => item.for.type === "top-saled-products"
);
Mock.onGet("/api/grocery-3/products?tag=top-sailed").reply(async () => {
  try {
    return [200, topProducts];
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
Mock.onGet("/api/grocery-3/products").reply(async () => {
  try {
    return [200, products];
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
Mock.onGet("/api/grocery-3/products?tag=offer").reply(async () => {
  try {
    return [200, db.discountOffers];
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
Mock.onGet("/api/grocery-3/main-carousel").reply(async () => {
  try {
    return [200, db.mainCarouselData];
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
