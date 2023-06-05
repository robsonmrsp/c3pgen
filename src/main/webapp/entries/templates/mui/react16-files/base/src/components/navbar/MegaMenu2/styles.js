import { Box, List, ListItem, styled } from "@mui/material";
import BazaarCard from "components/BazaarCard";
const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  ":hover": {
    color: theme.palette.primary.main,
    "& .menu-list": {
      display: "block",
    },
  },
}));
const MenusContainer = styled(Box)({
  left: 0,
  zIndex: 2,
  top: "68%",
  width: "100%",
  height: "100%",
  display: "none",
  minHeight: "500px",
  maxHeight: "500px",
  position: "absolute",
});
const StyledCard = styled(BazaarCard)({
  marginTop: 12,
  height: "100%",
  display: "flex",
  borderRadius: 0,
});
const CategoryList = styled(List)(({ theme }) => ({
  padding: 0,
  width: 300,
  height: "100%",
  borderRight: `1px solid ${theme.palette.grey[200]}`,
}));
const CategoryListItem = styled(ListItem)(({ theme, active }) => ({
  padding: "1rem 1.5rem",
  transition: "all 0.3s",
  justifyContent: "space-between",
  ...(active && {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary[100],
  }),
}));
const SubCategoryList = styled(List)(({ theme }) => ({
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));
const SubCategoryListItem = styled(ListItem)(({ theme }) => ({
  gap: 12,
  fontSize: 13,
  padding: "0",
  // fontWeight: 600,
  alignItems: "center",
  marginBottom: "1.5rem",
  transition: "all 0.3s",
  ":hover": {
    color: theme.palette.primary.main,
  },
}));
export {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem,
};
