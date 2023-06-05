import { Box } from "@mui/material";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";

// ==========================================================

// ==========================================================

const ProductCard5 = ({ imgUrl, title }) => {
  return (
    <Box>
      <HoverBox borderRadius="5px" mb={1}>
        <LazyImage alt={title} width={831} height={546} src={imgUrl} />
      </HoverBox>

      <H4 fontSize={14}>{title}</H4>
    </Box>
  );
};
export default ProductCard5;
