// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import Mock from "../../mock";
import * as db from "./data";
Mock.onGet("/api/grocery-2/main-carousel").reply(() => {
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
Mock.onGet("/api/grocery-2/services").reply(async () => {
  try {
    return [200, db.serviceList];
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
Mock.onGet("/api/grocery-2/categories").reply(() => {
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
Mock.onGet("/api/grocery-2/discount-card-list").reply(() => {
  try {
    return [200, db.discountCardList];
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
Mock.onGet("/api/grocery-2/category-navigation").reply(() => {
  try {
    return [200, db.categoryNavigation];
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
const products = db.products.filter(
  (item) => item.for.type === "featured-items"
);
Mock.onGet("/api/grocery-2/featured-products").reply(async () => {
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
const bestSellProducts = db.products.filter(
  (item) => item.for.type === "best-sell-products"
);
Mock.onGet("/api/grocery-2/best-sell-products").reply(() => {
  try {
    return [200, bestSellProducts];
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
const essProducts = db.products.filter(
  (item) => item.for.type === "home-essentials-products"
);
Mock.onGet("/api/grocery-2/home-essentials-products").reply(() => {
  try {
    return [200, essProducts];
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
const moreProducts = db.products.filter(
  (item) => item.for.type === "more-products"
);
Mock.onGet("/api/grocery-2/more-products").reply(() => {
  try {
    return [200, moreProducts];
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
Mock.onGet("/api/grocery-2/testimonial-list").reply(() => {
  try {
    return [200, db.testimonialList];
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
