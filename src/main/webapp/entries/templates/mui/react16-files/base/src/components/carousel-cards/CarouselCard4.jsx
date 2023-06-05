import { useRouter } from "next/router";
import { Box, styled, Button } from "@mui/material";
import { H1, H4, Paragraph, Span } from "components/Typography";

// custom styled components
const CardWrapper = styled(Box)(({ theme, img, mode }) => ({
  minHeight: 500,
  display: "flex",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${img})`,
  backgroundColor: mode === "dark" ? "#000" : "#fff",
  color: mode === "light" ? theme.palette.dark.main : "#fff",
  ...(theme.direction === "rtl" && {
    textAlign: "right",
    paddingRight: "5rem",
    justifyContent: "flex-end",
    "& > .MuiBox-root": {
      padding: 0,
    },
  }),
  [theme.breakpoints.down("md")]: {
    padding: 24,
    textAlign: "center",
    backgroundImage: "none",
    justifyContent: "center",
  },
}));

// ===============================================================

// ===============================================================

const CarouselCard4 = ({
  title,
  bgImage,
  category,
  discount,
  buttonLink,
  buttonText,
  description,
  mode = "dark",
}) => {
  const { push } = useRouter();
  return (
    <CardWrapper img={bgImage} mode={mode}>
      <Box
        pl={{
          md: 10,
        }}
      >
        <H4
          mb={1}
          lineHeight={1}
          fontWeight={400}
          textTransform="uppercase"
          fontSize={{
            sm: 30,
            xs: 24,
          }}
        >
          {title}
        </H4>

        <H1
          fontSize={{
            sm: 60,
            xs: 44,
          }}
          lineHeight={1}
          textTransform="uppercase"
        >
          {category}
        </H1>

        <H4
          fontSize={{
            sm: 30,
            xs: 24,
          }}
          lineHeight={1}
          mt={1.5}
          textTransform="uppercase"
        >
          SALE UP TO <Span color="primary.main">{discount}% OFF</Span>
        </H4>

        <Paragraph
          fontSize={{
            sm: 18,
            xs: 14,
          }}
          mb={4}
        >
          {description}
        </Paragraph>

        <Button
          variant="contained"
          size="large"
          color="dark"
          onClick={() => push(buttonLink)}
        >
          {buttonText}
        </Button>
      </Box>
    </CardWrapper>
  );
};
export default CarouselCard4;
