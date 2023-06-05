import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Grid, List, ListItem, styled } from "@mui/material";
import { H6 } from "components/Typography";
import { NavLink } from "components/nav-link";
import BazaarCard from "components/BazaarCard";
import { FlexRowCenter } from "components/flex-box";

// style components
const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  transition: "color 150ms ease-in-out",
  ":hover": {
    color: theme.palette.primary.main,
    "& .menu-list": {
      display: "block",
    },
  },
}));
const MenusContainer = styled(ListItem)(({ theme }) => ({
  zIndex: 2,
  top: "100%",
  minWidth: 1000,
  display: "none",
  position: "absolute",
  transform: `translate(-50%, 0%)`,
  [theme.breakpoints.down(1070)]: {
    minWidth: 800,
  },
}));
const MenuListItem = styled(ListItem)(({ theme }) => ({
  padding: ".5rem 2rem",
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const StyledNavLink = styled(NavLink)({
  transition: "all 0.3s",
});

// ===============================================================

// ===============================================================

const gridSize = (length) => {
  if (length === 1) return 12;
  if (length === 2) return 6;
  if (length === 3) return 4;
  if (length === 4) return 3;
  return 3;
};
const MegaMenu = ({ title, menuList }) => {
  // get grid size the basis of menu list
  const grid = gridSize(menuList.length);
  return (
    <Wrapper>
      <FlexRowCenter alignItems="flex-end" gap={0.3}>
        {title}{" "}
        <KeyboardArrowDown
          sx={{
            color: "grey.500",
            fontSize: "1.1rem",
          }}
        />
      </FlexRowCenter>

      <MenusContainer className="menu-list">
        <BazaarCard
          elevation={3}
          sx={{
            mt: 1.5,
            overflow: "hidden",
          }}
        >
          <Grid container>
            {menuList.slice(0, 4).map((category, key) => (
              <Grid
                item
                md={grid}
                key={key}
                sx={{
                  py: 2,
                  ":nth-of-type(odd)": {
                    backgroundColor: "grey.100",
                  },
                }}
              >
                {category.map((item) => {
                  return (
                    <List key={item.title}>
                      <H6 mb={0.5} pl={4}>
                        {item.title}
                      </H6>

                      {item.child.map((sub) => {
                        return (
                          <StyledNavLink href={sub.url} key={sub.title}>
                            <MenuListItem>{sub.title}</MenuListItem>
                          </StyledNavLink>
                        );
                      })}
                    </List>
                  );
                })}
              </Grid>
            ))}
          </Grid>
        </BazaarCard>
      </MenusContainer>
    </Wrapper>
  );
};
export default MegaMenu;
