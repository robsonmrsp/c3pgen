import { Button } from "@mui/material";

// ==================================================

// ==================================================

const WhiteButton = ({ children, ...props }) => {
  return (
    <Button
      color="dark"
      variant="contained"
      sx={{
        color: "dark.main",
        backgroundColor: "white",
        ":hover": {
          backgroundColor: "dark.main",
          color: "#fff",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
export default WhiteButton;
