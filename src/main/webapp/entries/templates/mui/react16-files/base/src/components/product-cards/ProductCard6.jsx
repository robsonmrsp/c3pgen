import { Card, Chip, styled } from "@mui/material";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";

// styled components
const StyledChip = styled(Chip)({
  zIndex: 2,
  top: "0.875rem",
  fontSize: "10px",
  padding: "0 8px",
  fontWeight: "600",
  position: "absolute",
});

// ========================================================

// ========================================================

const ProductCard6 = ({ title, subtitle, imgUrl }) => {
  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <StyledChip
        color="secondary"
        label={title}
        size="small"
        sx={{
          left: 12,
        }}
      />

      <StyledChip
        label={subtitle}
        size="small"
        sx={{
          right: 12,
          zIndex: 2,
        }}
      />

      <HoverBox borderRadius={2}>
        <LazyImage
          priority
          src={imgUrl}
          width={1035}
          height={348}
          alt={title}
        />
      </HoverBox>
    </Card>
  );
};
export default ProductCard6;
