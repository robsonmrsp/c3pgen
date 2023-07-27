"use client";
import { useGlobalContext } from "@/contexts/GlobalContext";
import classNames from "classnames";
import React from "react";

function Body({ children }) {
  const { state } = useGlobalContext();
  const sideBarOpen = classNames({
    "p-4 md:ml-64 h-auto pt-20": state.drawerOpened,
    "p-4 h-auto pt-20": !state.drawerOpened,
  });

  return (
    <main _id="Body" className={sideBarOpen}>
      {children}
    </main>
  );
}

export default Body;
