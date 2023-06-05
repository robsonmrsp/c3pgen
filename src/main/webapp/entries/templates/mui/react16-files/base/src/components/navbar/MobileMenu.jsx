import { Fragment, useState } from "react";
import { Clear, ExpandMore, Menu } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Box,
  Drawer,
  IconButton,
} from "@mui/material";
import { H6 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import { NavLink } from "components/nav-link";
import navbarNavigations from "data/navbarNavigations";
const MobileMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  // MODIFY THE NAVIGATION WITH NEW STRUCTURE
  const updateNavigations = navbarNavigations.reduce((prev, curr) => {
    const newArr = [...prev];
    if (!curr.child) {
      newArr.push({
        ...curr,
        extLink: true,
      });
    } else if (curr.megaMenu || curr.megaMenuWithSub) {
      const flated = curr.child.flat();
      newArr.push({
        title: curr.title,
        child: flated,
      });
    } else {
      newArr.push(curr);
    }
    return newArr;
  }, []);
  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.child) {
        return (
          <Accordion
            square
            key={index}
            elevation={0}
            disableGutters
            sx={{
              "&:not(:last-child)": {
                borderBottom: 0,
              },
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                padding: 0,
                minHeight: 48,
                boxShadow: "none",
                "& .Mui-expanded": {
                  color: "primary.main",
                  margin: 0,
                },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  margin: 0,
                  "& .MuiSvgIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <H6>{item.title}</H6>
            </AccordionSummary>

            <Box mx={2}>{renderLevels(item.child)}</Box>
          </Accordion>
        );
      }
      if (item.extLink) {
        return (
          <H6 key={index} py={1}>
            <NavLink href={item.url}>{item.title}</NavLink>
          </H6>
        );
      }
      return (
        <Box key={index} py={1}>
          <NavLink href={item.url}>{item.title}</NavLink>
        </Box>
      );
    });
  };
  return (
    <Fragment>
      <IconButton
        onClick={() => setOpenDrawer(true)}
        sx={{
          flexShrink: 0,
          color: "grey.600",
        }}
      >
        <Menu />
      </IconButton>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          zIndex: 15001,
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100%",
            position: "relative",
          }}
        >
          <Scrollbar
            autoHide={false}
            sx={{
              height: "100vh",
            }}
          >
            <Box
              maxWidth={500}
              margin="auto"
              position="relative"
              height="100%"
              px={5}
              py={8}
            >
              <IconButton
                onClick={() => setOpenDrawer(false)}
                sx={{
                  position: "absolute",
                  right: 30,
                  top: 15,
                }}
              >
                <Clear fontSize="small" />
              </IconButton>

              {renderLevels(updateNavigations)}
            </Box>
          </Scrollbar>
        </Box>
      </Drawer>
    </Fragment>
  );
};
export default MobileMenu;
