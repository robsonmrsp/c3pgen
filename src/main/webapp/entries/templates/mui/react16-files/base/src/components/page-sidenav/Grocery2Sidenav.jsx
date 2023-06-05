import { Fragment, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import appIcons from "components/icons";
import { Span } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
import BazaarCard from "components/BazaarCard";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
// ===========================================================

const Grocery2SideNav = ({ groceryNavigation }) => {
  const { shadows } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 180) setScrolled(true);
      else setScrolled(false);
    });
    return () => window.removeEventListener("scroll", null);
  }, []);
  const renderChild = (childList, type = "parent") => {
    if (type === "parent")
      return childList.map((item) => (
        <Fragment key={item.title}>
          <NavLink href={item.href} color="grey.700">
            <Span display="block" ml={4} py={1}>
              {item.title}
            </Span>
          </NavLink>

          {item.child && renderChild(item.child, "child")}
        </Fragment>
      ));
    else
      return childList.map((item, ind) => (
        <NavLink href={item.href} color="grey.700" key={ind}>
          <Span display="block" ml={6} pb={1}>
            {item.title}
          </Span>
        </NavLink>
      ));
  };
  return (
    <Scrollbar
      sx={{
        boxShadow: shadows[1],
        marginTop: scrolled ? 3 : 0,
        transition: "all 0.4s ease-in-out",
        maxHeight: scrolled ? "100%" : `calc(100% - ${104}px)`,
      }}
    >
      <BazaarCard
        elevation={3}
        sx={{
          height: "100%",
          borderRadius: "0px",
          position: "relative",
          p: "20px 20px 14px 24px",
        }}
      >
        {groceryNavigation.map((item, ind) => {
          const Icon = appIcons[item.icon];
          return (
            <Box mb={1} color="grey.700" key={ind}>
              {item.child ? (
                <Accordion expanded>
                  <AccordionHeader px={0} py={0.75}>
                    <FlexBox gap={1.5} alignItems="center">
                      <Icon fontSize="small" />
                      <Span fontWeight={600}>{item.title}</Span>
                    </FlexBox>
                  </AccordionHeader>

                  {item.child ? renderChild(item.child) : null}
                </Accordion>
              ) : (
                <NavLink key={item.title} href={item.href} color="grey.700">
                  <FlexBox py={0.75} gap={1.5}>
                    <Icon fontSize="small" />
                    <Span fontWeight={600}>{item.title}</Span>
                  </FlexBox>
                </NavLink>
              )}
            </Box>
          );
        })}
      </BazaarCard>
    </Scrollbar>
  );
};
export default Grocery2SideNav;
