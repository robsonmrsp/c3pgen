import { Rating } from "@mui/material";
import { compose, spacing, styled, typography } from "@mui/system";
const BazaarRating = styled(Rating)(compose(spacing, typography));
BazaarRating.defaultProps = {
  fontSize: "1.25rem",
};
export default BazaarRating;
