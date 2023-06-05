import { Box } from "@mui/material";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { H4, Small } from "components/Typography";
import BazaarRating from "components/BazaarRating";
import { FlexRowCenter } from "components/flex-box";
import { currency } from "lib";

// ======================================================

// ======================================================

const ProductCard4 = ({
  title,
  price,
  imgUrl,
  rating = 5,
  reviewCount = 10,
}) => {
  return (
    <Box>
      <HoverBox mb={2} mx="auto" borderRadius={2}>
        <LazyImage
          alt={title}
          width={380}
          height={380}
          src={imgUrl}
          style={{
            objectFit: "contain",
            objectPosition: "center center",
          }}
        />
      </HoverBox>

      <FlexRowCenter mb={0.5} gap={0.5}>
        <BazaarRating size="small" value={rating} color="warn" readOnly />
        <Small fontWeight={600}>({reviewCount})</Small>
      </FlexRowCenter>

      <H4 fontSize={14} textAlign="center" mb={0.5} title={title} ellipsis>
        {title}
      </H4>

      <H4 fontSize={14} textAlign="center" color="primary.main">
        {currency(price)}
      </H4>
    </Box>
  );
};
export default ProductCard4;
