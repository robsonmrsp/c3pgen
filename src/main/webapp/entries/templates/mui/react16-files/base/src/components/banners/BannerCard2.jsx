import Link from "next/link";
import { Box, Button, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { H1, H3, Paragraph } from "components/Typography";

// custom styled components
const CardWrapper = styled(Box)({
  maxHeight: 240,
  overflow: "hidden",
  borderRadius: "10px",
  position: "relative",
  "& img": {
    transition: "0.3s",
  },
  ":hover": {
    img: {
      transform: "scale(1.1)",
    },
  },
});
const CardContent = styled(Box)({
  top: 0,
  zIndex: 1,
  padding: 32,
  width: "100%",
  color: "#fff",
  height: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "space-between",
});

// ========================================================

// ========================================================

const BannerCard2 = ({ img, url, text1, text2, text3 }) => {
  return (
    <CardWrapper>
      <BazaarImage alt="category" height="100%" width="100%" src={img} />

      <CardContent>
        <Box>
          <Paragraph fontWeight={600}>{text1}</Paragraph>
          <H3>{text2}</H3>
          <H1 fontSize={52} lineHeight={1}>
            {text3}
          </H1>
        </Box>

        <Button
          LinkComponent={Link}
          href={url}
          variant="outlined"
          size="large"
          color="info"
        >
          Shop Now
        </Button>
      </CardContent>
    </CardWrapper>
  );
};
export default BannerCard2;
