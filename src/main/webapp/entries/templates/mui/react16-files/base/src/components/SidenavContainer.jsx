/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, styled } from "@mui/material";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { layoutConstant } from "utils/constants";
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: 24,
  display: "flex",
  position: "relative",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    width: layoutConstant.grocerySidenavWidth,
    minWidth: layoutConstant.grocerySidenavWidth,
    height: `calc(100vh - ${layoutConstant.headerHeight}px)`,
    "& .MuiPaper-root": {
      borderRadius: 5,
    },
  },
  ".fixed": {
    position: "fixed",
    scrollBehavior: "unset",
    top: layoutConstant.headerHeight,
  },
  ".pageContent": {
    left: "unset",
    position: "relative",
    marginLeft: "1.75rem",
    width: `calc(100% - 2rem - ${layoutConstant.grocerySidenavWidth}px)`,
  },
  ".pageContentShifted": {
    left: layoutConstant.grocerySidenavWidth,
  },
  ".section1": {
    marginBottom: "3rem",
    marginTop: "1.75rem",
  },
  "@keyframes slideDown": {
    "0%": {
      opacity: 0,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  [theme.breakpoints.down("md")]: {
    ".sidenav": {
      display: "none",
    },
    ".pageContent": {
      left: "0px !important",
      width: "100% !important",
      marginLeft: "auto !important",
      marginRight: "auto !important",
    },
  },
}));

// ================================================================

// ================================================================

const SidenavContainer = (props) => {
  const { SideNav, children, navFixedComponentID } = props;
  const [isSidenavFixed, setSidenavFixed] = useState(false);
  const scrollListener = useCallback(() => {
    const element = document.getElementById(navFixedComponentID);
    const elementBottom = element.getBoundingClientRect().bottom;
    const position =
      elementBottom + window.scrollY - layoutConstant.headerHeight;
    setSidenavFixed(window.pageYOffset > position);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  return (
    <StyledContainer>
      <Box
        className={clsx({
          sidenav: true,
          fixed: isSidenavFixed,
        })}
      >
        <SideNav />
      </Box>

      <Box
        className={clsx({
          pageContent: true,
          pageContentShifted: isSidenavFixed,
        })}
      >
        {children}
      </Box>
    </StyledContainer>
  );
};
export default SidenavContainer;
