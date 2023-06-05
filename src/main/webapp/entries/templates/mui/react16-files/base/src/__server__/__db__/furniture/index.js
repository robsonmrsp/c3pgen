import Mock from "../../mock";
import * as db from "./data";

// get sidebar navigation
Mock.onGet("/api/furniture-shop/navigation").reply(() => {
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

// get the main carousel
Mock.onGet("/api/furniture-shop/main-carousel").reply(() => {
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

// get new products
const newProducts = db.products.filter(
  (item) => item.for.type === "top-new-product"
);
Mock.onGet("/api/furniture-shop/products?tag=new").reply(() => {
  try {
    return [200, newProducts];
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

// get top selling products
const sellingProducts = db.products.filter(
  (item) => item.for.type === "top-selling-product"
);
Mock.onGet("/api/furniture-shop/products?tag=top-selling").reply(() => {
  try {
    return [200, sellingProducts];
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

// get all products
const allProducts = db.products.filter(
  (item) => item.for.type === "all-product"
);
Mock.onGet("/api/furniture-shop/all-products").reply(() => {
  try {
    return [200, allProducts];
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
