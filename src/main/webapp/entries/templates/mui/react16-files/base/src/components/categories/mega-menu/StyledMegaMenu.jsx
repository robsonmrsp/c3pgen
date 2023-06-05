import { Box, styled } from "@mui/material";

// styled component
const Wrapper = styled(Box)(({ theme }) => ({
  display: "none",
  position: "absolute",
  left: "100%",
  right: "auto",
  top: 0,
  zIndex: 99,
  "& .title-link, & .child-link": {
    color: "inherit",
    fontWeight: 600,
    display: "block",
    padding: "0.5rem 0px",
  },
  "& .child-link": {
    fontWeight: 400,
  },
  "& .mega-menu-content": {
    padding: "0.5rem 0px",
    marginLeft: "1rem",
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    transition: "all 250ms ease-in-out",
  },
}));

// =================================================

// =================================================

const StyledMegaMenu = ({ children }) => {
  return <Wrapper className="mega-menu">{children}</Wrapper>;
};
export default StyledMegaMenu;
