import { Box, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import Image from "next/image";

// styled component
const StyledParagraph = styled(Paragraph)(({ theme }) => ({
  top: "10px",
  left: "10px",
  fontWeight: 600,
  borderRadius: "5px",
  position: "absolute",
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.secondary[100],
}));
const StyledParagraph2 = styled(Paragraph)(({ theme }) => ({
  top: "10px",
  right: "10px",
  color: "white",
  fontWeight: 600,
  borderRadius: "5px",
  position: "absolute",
  padding: "0.5rem 1.5rem",
  backgroundColor: theme.palette.primary[600],
}));

// ===========================================================

// ===========================================================

const ProductCard11 = ({ title, imgUrl, off }) => {
  return (
    <Box
      position="relative"
      sx={{
        boxShadow: 4,
      }}
    >
      <Image
        alt={title}
        width={580}
        src={imgUrl}
        height={225}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />

      <StyledParagraph>{title}</StyledParagraph>
      <StyledParagraph2>{off}% OFF</StyledParagraph2>
    </Box>
  );
};
export default ProductCard11;
