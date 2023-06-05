import Link from "next/link";
import { useState } from "react";
import { ChevronRight, KeyboardArrowDown } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { H6 } from "components/Typography";
import useSettings from "hooks/useSettings";
import Scrollbar from "components/Scrollbar";
import { FlexRowCenter } from "components/flex-box";
import {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem,
} from "./styles";

// ===============================================================

// ===============================================================

const MegaMenu2 = ({ title, menuList }) => {
  const { settings } = useSettings();
  const [openList, setOpenList] = useState(menuList[0].title);
  const categories = menuList.reduce((prev, curr) => [...prev, curr.title], []);
  const subMenus = menuList.find((item) => item.title === openList);
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
        <StyledCard>
          <CategoryList>
            {categories.map((item) => (
              <CategoryListItem
                key={item}
                active={openList === item ? 1 : 0}
                onMouseEnter={() => setOpenList(item)}
              >
                {item}
                <ChevronRight
                  fontSize="small"
                  sx={{
                    transform: `rotate(${
                      settings.direction === "rtl" ? "180deg" : "0"
                    })`,
                  }}
                />
              </CategoryListItem>
            ))}
          </CategoryList>

          <Scrollbar
            autoHide={false}
            sx={{
              width: "100%",
            }}
          >
            <Box px={6} py={2} height="100%">
              {subMenus.child.map((item, key) => {
                return (
                  <Box key={key}>
                    <H6 fontWeight={700} my={3}>
                      {item.title}
                    </H6>

                    <SubCategoryList>
                      {item.child.map((sub, key) => {
                        return (
                          <Link href="/" key={key}>
                            <SubCategoryListItem>
                              {sub.img && (
                                <Avatar
                                  src={sub.img}
                                  sx={{
                                    backgroundColor: "grey.100",
                                    borderRadius: 1,
                                  }}
                                />
                              )}
                              {sub.Icon && (
                                <sub.Icon
                                  sx={{
                                    fontSize: 16,
                                  }}
                                />
                              )}
                              {sub.title}
                            </SubCategoryListItem>
                          </Link>
                        );
                      })}
                    </SubCategoryList>
                  </Box>
                );
              })}
            </Box>
          </Scrollbar>
        </StyledCard>
      </MenusContainer>
    </Wrapper>
  );
};
export default MegaMenu2;
