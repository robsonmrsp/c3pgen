"use client";

import React, { Dispatch, createContext, useReducer, useContext } from "react";

type StateType = {
  drawerOpened: boolean;
};

type ActionType = {
  type: string;
};

const initialState: StateType = {
  drawerOpened: true,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      console.log("open drawer");
      return {
        ...state,
        drawerOpened: true,
      };
    case "CLOSE_DRAWER":
      console.log("close drawer");
      return {
        ...state,
        drawerOpened: false,
      };
    case "TOGGLE_DRAWER":
      console.log("close drawer");
      return {
        ...state,
        drawerOpened: !state.drawerOpened,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<{
  state: StateType;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}>({
  state: initialState,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // To add and remove any new property and access function
  const value = {
    state,
    openDrawer: () => {
      dispatch({ type: "OPEN_DRAWER" });
    },
    closeDrawer: () => {
      dispatch({ type: "CLOSE_DRAWER" });
    },
    toggleDrawer: () => {
      dispatch({ type: "TOGGLE_DRAWER" });
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
