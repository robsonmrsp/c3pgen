import { createContext, useContext, useMemo, useReducer } from "react";

// =================================================================================

// =================================================================================

const INITIAL_CART = [
  {
    qty: 1,
    price: 210,
    slug: "silver-high-neck-sweater",
    name: "Silver High Neck Sweater",
    id: "6e8f151b-277b-4465-97b6-547f6a72e5c9",
    imgUrl:
      "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png",
  },
  {
    qty: 1,
    price: 110,
    slug: "yellow-casual-sweater",
    name: "Yellow Casual Sweater",
    id: "76d14d65-21d0-4b41-8ee1-eef4c2232793",
    imgUrl:
      "/assets/images/products/Fashion/Clothes/21.YellowCasualSweater.png",
  },
  {
    qty: 1,
    price: 140,
    slug: "denim-blue-jeans",
    name: "Denim Blue Jeans",
    id: "0fffb188-98d8-47f7-8189-254f06cad488",
    imgUrl: "/assets/images/products/Fashion/Clothes/4.DenimBlueJeans.png",
  },
];
const INITIAL_STATE = {
  cart: INITIAL_CART,
};
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);
      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return {
          ...state,
          cart: filteredCart,
        };
      }

      // IF PRODUCT ALREADY EXITS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                qty: cartItem.qty,
              }
            : item
        );
        return {
          ...state,
          cart: newCart,
        };
      }
      return {
        ...state,
        cart: [...cartList, cartItem],
      };
    default: {
      return state;
    }
  }
};

// =======================================================

// =======================================================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;
