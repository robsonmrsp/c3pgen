import shuffle from "lodash/shuffle";
import Mock from "../../mock";
import * as db from "./data";

// get all products
Mock.onGet("/api/market-2/products").reply((config) => {
  try {
    if (config?.params?.type) {
      return [200, shuffle(db.products)];
    }
    return [200, db.products];
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
Mock.onGet("/api/market-2/service").reply(() => {
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
Mock.onGet("/api/market-2/categories").reply(() => {
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
Mock.onGet("/api/market-2/main-carousel").reply(async () => {
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

// electronics category products
Mock.onGet("/api/market-2/category-based-product?tag=electronics").reply(
  async () => {
    try {
      return [
        200,
        {
          category: db.singleCategory,
          products: db.products,
        },
      ];
    } catch (err) {
      console.error(err);
      return [
        500,
        {
          message: "Internal server error",
        },
      ];
    }
  }
);

// men's fashion category products
Mock.onGet("/api/market-2/category-based-product?tag=men").reply(async () => {
  try {
    const data = {
      products: db.products.slice(2),
      category: {
        title: "Men's Fashion",
        children: db.singleCategory.children,
      },
    };
    return [200, data];
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

// women's fashion category products
Mock.onGet("/api/market-2/category-based-product?tag=women").reply(async () => {
  try {
    const data = {
      products: db.products.slice(3),
      category: {
        title: "Women's Fashion",
        children: db.singleCategory.children,
      },
    };
    return [200, data];
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

// get all brands
Mock.onGet("/api/market-2/brand").reply(async () => {
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
