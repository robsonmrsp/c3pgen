import { useState } from "react";
import Box from "@mui/material/Box";
import Setting from "components/Setting";
import DashboardLayout from "components/layouts/admin";

const IndexPage = () => {
  return (
    <Box id="top" overflow="hidden" bgcolor="background.paper">
      {/* <Setting /> */}
    </Box>
  );
};

IndexPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
IndexPage.requireAuth = true;
export default IndexPage;
