import BabyBoy from "components/icons/BabyBoy";
import BabyGirl from "components/icons/BabyGirl";
import Car from "components/icons/Car";
import Dress from "components/icons/Dress";
import Food from "components/icons/Food";
import Gift from "components/icons/Gift";
import Laptop from "components/icons/Laptop";
import MakeUp from "components/icons/MakeUp";
import Man from "components/icons/Man";
import Microphone from "components/icons/Microphone";
import MotorBike from "components/icons/MotorBike";
import Pets from "components/icons/Pets";
import PlantPot from "components/icons/PlantPot";
import TeddyBear from "components/icons/TeddyBear";
import Woman from "components/icons/Woman";
const navigations = [
  {
    icon: Dress,
    title: "Fashion",
    href: "/fashion",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Man Clothes",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
        {
          title: "Woman Clothes",
          href: "/product/search/woman-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
      ],
      rightImage: {
        imgUrl: "/assets/images/promotion/offer-1.png",
        href: "/sale-page-1",
      },
    },
  },
  {
    icon: Laptop,
    title: "Electronics",
    href: "/product/search/electronics",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Man Clothes",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
        {
          title: "Woman Clothes",
          href: "/product/search/woman-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
      ],
      bottomImage: {
        imgUrl: "/assets/images/promotion/offer-5.png",
        href: "/",
      },
    },
  },
  {
    icon: MotorBike,
    title: "Bikes",
    href: "/product/search/bikes",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: Man,
        title: "Man",
        href: "/product/search/fashion",
        megaMenu: "MegaMenu1",
        menuData: {
          categories: [
            {
              title: "Man Clothes",
              href: "/product/search/man-clothes",
              subCategories: [
                {
                  title: "Shirt",
                  href: "/product/search/shirt",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "T- shirt",
                  href: "/product/search/t-shirt",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
                {
                  title: "Pant",
                  href: "/product/search/pant",
                  imgUrl: "/assets/images/products/categories/pant.png",
                },
                {
                  title: "Underwear",
                  href: "/product/search/underwear",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Accessories",
              href: "/product/search/accessories",
              subCategories: [
                {
                  title: "Belt",
                  href: "/product/search/belt",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
                {
                  title: "Hat",
                  href: "/product/search/Hat",
                  imgUrl: "/assets/images/products/categories/hat.png",
                },
                {
                  title: "Watches",
                  href: "/product/search/Watches",
                  imgUrl: "/assets/images/products/categories/watch.png",
                },
                {
                  title: "Sunglasses",
                  href: "/product/search/Sunglasses",
                  imgUrl: "/assets/images/products/categories/sunglass.png",
                },
              ],
            },
            {
              title: "Shoes",
              href: "/product/search/shoes",
              subCategories: [
                {
                  title: "Sneakers",
                  href: "/product/search/Sneakers",
                  imgUrl: "/assets/images/products/categories/sneaker.png",
                },
                {
                  title: "Sandals",
                  href: "/product/search/Sandals",
                  imgUrl: "/assets/images/products/categories/sandal.png",
                },
                {
                  title: "Formal",
                  href: "/product/search/Formal",
                  imgUrl: "/assets/images/products/categories/shirt.png",
                },
                {
                  title: "Casual",
                  href: "/product/search/Casual",
                  imgUrl: "/assets/images/products/categories/t-shirt.png",
                },
              ],
            },
            {
              title: "Bags",
              href: "/product/search/bags",
              subCategories: [
                {
                  title: "Backpack",
                  href: "/product/search/backpack",
                  imgUrl: "/assets/images/products/categories/backpack.png",
                },
                {
                  title: "Crossbody Bags",
                  href: "/product/search/Crossbody Bags",
                  imgUrl: "/assets/images/products/categories/bag.png",
                },
                {
                  title: "Side Bags",
                  href: "/product/search/Side Bags",
                  imgUrl: "/assets/images/products/categories/mini-bag.png",
                },
                {
                  title: "Slides",
                  href: "/product/search/Slides",
                  imgUrl: "/assets/images/products/categories/belt.png",
                },
              ],
            },
          ],
        },
      },
      {
        icon: Woman,
        title: "Woman",
        href: "/product/search/electronics",
        megaMenu: 2,
      },
      {
        icon: BabyBoy,
        title: "Baby Boy",
        href: "/product/search/home&garden",
        megaMenu: 3,
      },
      {
        icon: BabyGirl,
        title: "Baby Girl",
        href: "/product/search/bikes",
        megaMenu: "MegaMenu1",
      },
    ],
  },
  {
    icon: PlantPot,
    title: "Home & Garden",
    href: "/product/search/home&garden",
    menuComponent: "MegaMenu1",
    menuData: {
      categories: [
        {
          title: "Man Clothes",
          href: "/product/search/man-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
        {
          title: "Woman Clothes",
          href: "/product/search/woman-clothes",
          subCategories: [
            {
              title: "Shirt",
              href: "/product/search/shirt",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "T- shirt",
              href: "/product/search/t-shirt",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
            {
              title: "Pant",
              href: "/product/search/pant",
              imgUrl: "/assets/images/products/categories/pant.png",
            },
            {
              title: "Underwear",
              href: "/product/search/underwear",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Accessories",
          href: "/product/search/accessories",
          subCategories: [
            {
              title: "Belt",
              href: "/product/search/belt",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
            {
              title: "Hat",
              href: "/product/search/Hat",
              imgUrl: "/assets/images/products/categories/hat.png",
            },
            {
              title: "Watches",
              href: "/product/search/Watches",
              imgUrl: "/assets/images/products/categories/watch.png",
            },
            {
              title: "Sunglasses",
              href: "/product/search/Sunglasses",
              imgUrl: "/assets/images/products/categories/sunglass.png",
            },
          ],
        },
        {
          title: "Shoes",
          href: "/product/search/shoes",
          subCategories: [
            {
              title: "Sneakers",
              href: "/product/search/Sneakers",
              imgUrl: "/assets/images/products/categories/sneaker.png",
            },
            {
              title: "Sandals",
              href: "/product/search/Sandals",
              imgUrl: "/assets/images/products/categories/sandal.png",
            },
            {
              title: "Formal",
              href: "/product/search/Formal",
              imgUrl: "/assets/images/products/categories/shirt.png",
            },
            {
              title: "Casual",
              href: "/product/search/Casual",
              imgUrl: "/assets/images/products/categories/t-shirt.png",
            },
          ],
        },
        {
          title: "Bags",
          href: "/product/search/bags",
          subCategories: [
            {
              title: "Backpack",
              href: "/product/search/backpack",
              imgUrl: "/assets/images/products/categories/backpack.png",
            },
            {
              title: "Crossbody Bags",
              href: "/product/search/Crossbody Bags",
              imgUrl: "/assets/images/products/categories/bag.png",
            },
            {
              title: "Side Bags",
              href: "/product/search/Side Bags",
              imgUrl: "/assets/images/products/categories/mini-bag.png",
            },
            {
              title: "Slides",
              href: "/product/search/Slides",
              imgUrl: "/assets/images/products/categories/belt.png",
            },
          ],
        },
      ],
    },
  },
  {
    icon: Gift,
    title: "Gifts",
    href: "/product/search/gifts",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        icon: Dress,
        title: "Fashion",
        href: "/product/search/fashion",
      },
      {
        icon: Laptop,
        title: "Electronics",
        href: "/product/search/electronics",
      },
      {
        icon: PlantPot,
        title: "Home & Garden",
        href: "/product/search/home&garden",
      },
      {
        icon: MotorBike,
        title: "Bikes",
        href: "/product/search/bikes",
      },
      {
        icon: Gift,
        title: "Gifts",
        href: "/product/search/gifts",
      },
      {
        icon: Microphone,
        title: "Music",
        href: "/product/search/music",
      },
      {
        icon: MakeUp,
        title: "Health & Beauty",
        href: "/product/search/health&beauty",
      },
      {
        icon: Pets,
        title: "Pets",
        href: "/product/search/pets",
      },
      {
        icon: TeddyBear,
        title: "Baby Toys",
        href: "/product/search/baby-toys",
      },
      {
        icon: Food,
        title: "Groceries",
        href: "/product/search/groceries",
      },
      {
        icon: Car,
        title: "Automotive",
        href: "/product/search/automotive",
      },
    ],
  },
  {
    icon: Microphone,
    title: "Music",
    href: "/product/search/music",
    menuComponent: "MegaMenu1",
  },
  {
    icon: MakeUp,
    title: "Health & Beauty",
    href: "/product/search/health&beauty",
    menuComponent: "MegaMenu1",
  },
  {
    icon: Pets,
    title: "Pets",
    href: "/product/search/pets",
    menuComponent: "MegaMenu1",
  },
  {
    icon: TeddyBear,
    title: "Baby Toys",
    href: "/product/search/baby-toys",
    menuComponent: "MegaMenu1",
  },
  {
    icon: Food,
    title: "Groceries",
    href: "/product/search/groceries",
    menuComponent: "MegaMenu1",
  },
  {
    icon: Car,
    title: "Automotive",
    href: "/product/search/automotive",
    menuComponent: "MegaMenu1",
  },
];
export default navigations;
