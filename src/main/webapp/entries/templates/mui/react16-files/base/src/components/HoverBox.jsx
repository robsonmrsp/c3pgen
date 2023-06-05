import { Box, styled } from "@mui/material";
const HoverBox = styled(Box)({
  display: "flex",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    inset: 0,
    zIndex: 1,
    opacity: 0,
    content: '""',
    position: "absolute",
    backgroundColor: "black",
    transition: "all 250ms ease-in-out",
    width: "100%",
    height: "100%",
  },
  "&:hover:after": {
    opacity: 0.3,
  },
});
export default HoverBox;
