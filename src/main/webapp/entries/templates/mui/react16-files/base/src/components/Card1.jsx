import { Card, styled } from "@mui/material";
const Card1 = styled(Card)({
  position: "relative",
  padding: "1.5rem 1.75rem",
  ["@media only screen and (max-width: 678px)"]: {
    padding: "1rem",
  },
});
export default Card1;
