// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import * as db from "./data";
Mock.onGet("/api/gadget-store/featured-categories").reply(async () => {
  try {
    return [200, db.categories];
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
Mock.onGet("/api/gadget-store/two-banners").reply(async () => {
  try {
    return [200, db.bannerData];
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
Mock.onGet("/api/gadget-store/blog-lists").reply(async () => {
  try {
    return [200, db.articles];
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
Mock.onGet("/api/gadget-store/main-carousel").reply(() => {
  try {
    return [200, db.carouselProducts];
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
const getProducts = (type) =>
  db.products.filter((item) => item.for.type === type);
const topPicksProducts = getProducts("top-picks-products");
const mostViewProducts = getProducts("most-viewed-products");
const newArrivalProducts = getProducts("new-arrival-products");
Mock.onGet("/api/gadget-store/products?tag=top-picks").reply(() => {
  try {
    return [200, topPicksProducts];
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
Mock.onGet("/api/gadget-store/products?tag=most-viewed").reply(async () => {
  try {
    return [200, mostViewProducts];
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
Mock.onGet("/api/gadget-store/products?tag=new-arrival").reply(async () => {
  try {
    return [200, newArrivalProducts];
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
