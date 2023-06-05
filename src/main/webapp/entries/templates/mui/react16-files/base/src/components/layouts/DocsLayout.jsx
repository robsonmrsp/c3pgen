import { Box } from "@mui/material";
import Header from "pages-sections/landing/Header";
const DocsLayout = ({ children }) => {
  return (
    <Box>
      <Header />

      {children}
    </Box>
  );
};
export default DocsLayout;
