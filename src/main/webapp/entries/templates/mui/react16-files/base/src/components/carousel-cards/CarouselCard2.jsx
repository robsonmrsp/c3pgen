import { Favorite } from "@mui/icons-material";
import { Box, Button, Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { H2, H3, H4, Paragraph } from "components/Typography";
import Countdown from "pages-sections/fashion-shop-1/countdown";

// styled component
const ContentWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem",
      width: "100%",
    },
  },
  [theme.breakpoints.between("sm", "md")]: {
    "&": {
      padding: "0 3rem",
      paddingBottom: "2rem",
      width: "80%",
    },
  },
}));

// ================================================================

// ================================================================

const CarouselCard2 = ({ imgUrl, productName, expireDate }) => {
  return (
    <Grid container alignItems="center">
      <Grid item lg={6} md={5} sm={12} xs={12}>
        <BazaarImage
          src={imgUrl}
          alt="xiaomi-watch-1"
          sx={{
            display: "block",
            mx: "auto",
            maxWidth: "100%",
            p: 5,
          }}
        />
      </Grid>
      <Grid item lg={4} md={5} sm={12} xs={12}>
        <ContentWrapper>
          <H3 color="primary.500" mb="0.2rem">
            Deal Of The Day
          </H3>
          <H2>{productName}</H2>

          <Paragraph mt="0.3rem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
            lobortis consequat eu, quam etiam at quis ut convallis.
          </Paragraph>

          <H4 mt="1.5rem" mb="0.3rem">
            Fresh Deal Everyday, Get It Now!
          </H4>

          {/* countdown time */}
          <Countdown expireDate={expireDate} />

          <Box mt={3}>
            <Button
              color="primary"
              disableElevation
              variant="contained"
              className="button-link"
              sx={{
                px: "1.75rem",
                height: "44px",
                borderRadius: "8px",
                mr: "1rem",
              }}
            >
              BUY NOW
            </Button>

            <Button
              sx={{
                px: "1rem",
                color: "white",
                height: "44px",
                borderRadius: "8px",
                backgroundColor: "grey.500",
                "&:hover": {
                  backgroundColor: "grey.500",
                },
              }}
            >
              <Favorite />
            </Button>
          </Box>
        </ContentWrapper>
      </Grid>
    </Grid>
  );
};
export default CarouselCard2;
