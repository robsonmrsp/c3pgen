// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import * as db from "./data";
import Mock from "../../mock";
import shops from "../shop/data";
Mock.onGet("/api/market-1/main-carousel").reply(async () => {
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
Mock.onGet("/api/market-1/top-categories").reply(async () => {
  try {
    const topCategories = db.categories.filter(
      (item) => item.for.type === "top-categories"
    );
    return [200, topCategories];
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
Mock.onGet("/api/market-1/flash-deals").reply(async () => {
  try {
    const products = db.products.filter(
      (item) => item.for.type === "flash-deals"
    );
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
Mock.onGet("/api/market-1/big-discounts").reply(async () => {
  try {
    const products = db.products.filter(
      (item) => item.for.type === "big-discounts"
    );
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
Mock.onGet("/api/market-1/toprated-product").reply(async () => {
  try {
    const products = db.products.filter(
      (item) => item.for.type === "top-ratings"
    );
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
Mock.onGet("/api/market-1/new-arrivals").reply(async () => {
  try {
    const products = db.products.filter(
      (item) => item.for.type === "new-arrivals"
    );
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
Mock.onGet("/api/market-1/toprated-brand").reply(async () => {
  try {
    const featureBrands = db.brands.filter(
      (item) => item.for.type === "featured-brands"
    );
    return [200, featureBrands];
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
Mock.onGet("/api/market-1/car-brand-list").reply(async () => {
  try {
    const carBrands = db.brands.filter(
      (item) => item.for.type === "car-brands"
    );
    return [200, carBrands];
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
Mock.onGet("/api/market-1/car-list").reply(async () => {
  try {
    const products = db.products.filter((item) => item.for.type === "cars");
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
Mock.onGet("/api/market-1/mobile-brand-list").reply(async () => {
  try {
    const mobileBrands = db.brands.filter(
      (item) => item.for.type === "mobile-brands"
    );
    return [200, mobileBrands];
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
Mock.onGet("/api/market-1/mobile-shop-list").reply(async () => {
  try {
    const imageNames = ["herman miller", "otobi", "hatil", "steelcase"];
    const shopList = shops.slice(4, 8).map((item, i) => ({
      ...item,
      thumbnail: imageNames[i],
    }));
    return [200, shopList];
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
Mock.onGet("/api/market-1/mobile-list").reply(async () => {
  try {
    const products = db.products.filter(
      (item) => item.for.type === "mobile-phones"
    );
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
Mock.onGet("/api/market-1/optics/watch-brands").reply(async () => {
  try {
    const opticsBrands = db.brands.filter(
      (item) => item.for.type === "optics-brands"
    );
    return [200, opticsBrands];
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
Mock.onGet("/api/market-1/optics/watch-shops").reply(async () => {
  try {
    const imageNames = ["herman miller", "zeiss", "hatil", "steelcase"];
    const shopList = shops.slice(0, 4).map((item, i) => ({
      ...item,
      thumbnail: imageNames[i],
    }));
    return [200, shopList];
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
Mock.onGet("/api/market-1/optics-list").reply(async () => {
  try {
    const products = db.products.filter((item) => item.for.type === "optics");
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
Mock.onGet("/api/market-1/bottom-categories").reply(async () => {
  try {
    const categories = db.categories.filter(
      (item) => item.for.type === "categories"
    );
    return [200, categories];
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
Mock.onGet("/api/market-1/get-more-items").reply(async () => {
  try {
    const products = db.products.filter(
      (item) => item.for.type === "more-products"
    );
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
Mock.onGet("/api/market-1/get-service-list").reply(async () => {
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
