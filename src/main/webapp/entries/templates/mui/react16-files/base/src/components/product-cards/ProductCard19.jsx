import Link from "next/link";
import { Box, Rating } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
import BazaarImage from "components/BazaarImage";
import { Paragraph } from "components/Typography";
import { currency } from "lib";

// ===========================================

// ===========================================

const ProductCard19 = ({ image, title, price, slug }) => {
  return (
    <FlexBox
      mb={2}
      gap={2}
      alignItems="center"
      sx={{
        " & a": {
          flexShrink: 0,
        },
        ":last-of-type": {
          mb: 0,
        },
        "& img": {
          transition: "0.3s",
        },
        ":hover": {
          img: {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Link href={`/product/${slug}`}>
        <Box maxWidth={100} bgcolor="grey.300">
          <BazaarImage width="100%" alt="product" src={image} />
        </Box>
      </Link>

      <Box>
        <NavLink href="#">
          <Paragraph fontSize={16}>{title}</Paragraph>
        </NavLink>
        <Paragraph fontWeight={700}>{currency(price)}</Paragraph>
        <Rating
          value={4}
          sx={{
            fontSize: 14,
          }}
        />
      </Box>
    </FlexBox>
  );
};
export default ProductCard19;
