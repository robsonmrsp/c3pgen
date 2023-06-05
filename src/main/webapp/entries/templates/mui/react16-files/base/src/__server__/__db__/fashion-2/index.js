import * as db from "./data";
import Mock from "../../mock";
const getProducts = (type) =>
  db.products.filter((item) => item.for.type === type);
const saleProducts = getProducts("sale-products");
const latestProducts = getProducts("latest-products");
const popularProducts = getProducts("popular-products");
const featureProducts = getProducts("featured-products");
const bestWeekProducts = getProducts("best-week-products");
const bestSellingProducts = getProducts("best-selling-product");

// get all products
Mock.onGet("/api/fashion-shop-2/products").reply(() => {
  try {
    return [200, bestSellingProducts];
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

// get feature products
Mock.onGet("/api/fashion-shop-2/products?tag=feature").reply(() => {
  try {
    return [200, featureProducts];
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

// get sale products
Mock.onGet("/api/fashion-shop-2/products?tag=sale").reply(() => {
  try {
    return [200, saleProducts];
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

// get latest products
Mock.onGet("/api/fashion-shop-2/products?tag=latest").reply(() => {
  try {
    return [200, latestProducts];
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

// get best week products
Mock.onGet("/api/fashion-shop-2/products?tag=best-week").reply(() => {
  try {
    return [200, bestWeekProducts];
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

// get popular products
Mock.onGet("/api/fashion-shop-2/products?tag=popular").reply(() => {
  try {
    return [200, popularProducts];
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

// get blogs
Mock.onGet("/api/fashion-shop-2/blogs").reply(() => {
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

// get all service
Mock.onGet("/api/fashion-shop-2/service").reply(() => {
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

// get all categories
Mock.onGet("/api/fashion-shop-2/category").reply(() => {
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

// get all carousel data
Mock.onGet("/api/fashion-shop-2/main-carousel").reply(async () => {
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

// get all brand data
Mock.onGet("/api/fashion-shop-2/brands").reply(async () => {
  try {
    return [200, db.brandList];
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
