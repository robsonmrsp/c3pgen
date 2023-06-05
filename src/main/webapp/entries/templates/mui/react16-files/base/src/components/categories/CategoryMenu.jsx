import { Box, styled } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CategoryMenuCard from "./CategoryMenuCard";

// styled component
const Wrapper = styled(Box)(({ open, theme: { direction } }) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${
      open ? (direction === "rtl" ? "-90deg" : "90deg") : "0deg"
    })`,
  },
}));

// ===========================================================

// ===========================================================

const CategoryMenu = ({ open: isOpen = false, children }) => {
  const [open, setOpen] = useState(isOpen);
  const popoverRef = useRef(open);
  popoverRef.current = open;
  const toggleMenu = (e) => {
    e.stopPropagation();
    if (!isOpen) setOpen((open) => !open);
  };
  const handleDocumentClick = useCallback(() => {
    if (popoverRef.current && !isOpen) setOpen(false);
  }, [isOpen]);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);
  return (
    <Wrapper open={open}>
      {React.cloneElement(children, {
        open,
        onClick: toggleMenu,
        className: `${children.props.className}`,
      })}

      <CategoryMenuCard open={open} />
    </Wrapper>
  );
};
export default CategoryMenu;
