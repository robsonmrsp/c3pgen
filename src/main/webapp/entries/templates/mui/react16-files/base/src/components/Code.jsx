import { Box } from "@mui/material";
const Code = ({ children }) => {
  return (
    <Box
      component="code"
      sx={{
        backgroundColor: "grey.400",
        px: 1,
        py: 0.2,
        borderRadius: 1,
      }}
    >
      {children}
    </Box>
  );
};
export default Code;
