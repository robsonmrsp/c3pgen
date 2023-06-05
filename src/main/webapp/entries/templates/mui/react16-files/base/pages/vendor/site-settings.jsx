import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, styled, Tab } from "@mui/material";
import DashboardLayout from "components/layouts/admin";
import TopbarForm from "pages-sections/site-settings/TopbarForm";
import FooterForm from "pages-sections/site-settings/FooterForm";
import GeneralForm from "pages-sections/site-settings/GeneralForm";
import BannerSlider from "pages-sections/site-settings/BannerSlider";
import ShippingVatForm from "pages-sections/site-settings/ShippingVatForm";
import SocialLinksForm from "pages-sections/site-settings/SocialLinksForm";

// styled components
const StyledTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
});
const StyledTabList = styled(TabList)(({ theme }) => ({
  "& .MuiTab-root.Mui-selected": {
    color: theme.palette.info.main,
  },
  "& .MuiTabs-indicator": {
    background: theme.palette.info.main,
  },
}));

// =============================================================================
SiteSettings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
// =============================================================================

export default function SiteSettings() {
  const [selectTab, setSelectTab] = useState("general");
  return (
    <Box py={4}>
      <Card
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <TabContext value={selectTab}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "grey.300",
            }}
          >
            <StyledTabList
              onChange={(_, value) => setSelectTab(value)}
              variant="scrollable"
            >
              <Tab label="General" value="general" disableRipple />
              <Tab label="Topbar" value="topbar" disableRipple />
              <Tab label="Footer" value="footer" disableRipple />
              <Tab label="Social Links" value="social-links" disableRipple />
              <Tab label="Banner Slider" value="banner-slider" disableRipple />
              <Tab label="Shipping & Vat" value="shipping-vat" disableRipple />
            </StyledTabList>
          </Box>

          <StyledTabPanel value="general">
            <GeneralForm />
          </StyledTabPanel>

          <StyledTabPanel value="topbar">
            <TopbarForm />
          </StyledTabPanel>

          <StyledTabPanel value="footer">
            <FooterForm />
          </StyledTabPanel>

          <StyledTabPanel value="social-links">
            <SocialLinksForm />
          </StyledTabPanel>

          <StyledTabPanel value="banner-slider">
            <BannerSlider />
          </StyledTabPanel>

          <StyledTabPanel value="shipping-vat">
            <ShippingVatForm />
          </StyledTabPanel>
        </TabContext>
      </Card>
    </Box>
  );
}
