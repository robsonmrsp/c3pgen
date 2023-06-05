import { Box, Button, Card, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import Verify from "components/icons/Verify";
import { H1, H3, H5 } from "components/Typography";
import { currency } from "lib";

// styled components
const Wrapper = styled(Card)({
  display: "flex",
  padding: "3rem 2rem",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
});
const PackageHeading = styled(H1)(({ theme }) => ({
  ":after": {
    fontSize: 16,
    fontWeight: 600,
    content: "'/month'",
    verticalAlign: "baseline",
    color: theme.palette.grey[600],
  },
}));

// ===================================================

// ===================================================

const SellerPackageCard = ({ listItem }) => {
  const { packageName, price, Icon, features = [] } = listItem;
  return (
    <Wrapper>
      <Icon
        sx={{
          fontSize: 100,
        }}
      />

      <H3 mt={3} fontWeight={600}>
        {packageName} Package
      </H3>

      <PackageHeading fontSize={60}>{currency(price, 0)}</PackageHeading>

      <Box mt={1} mb={2}>
        {features.map((item, index) => (
          <FlexBox gap={2} my={2} alignItems="center" key={index}>
            <Verify />
            <H5>{item}</H5>
          </FlexBox>
        ))}
      </Box>

      <FlexBox alignItems="center" gap={2} width={200}>
        <Button fullWidth color="secondary" variant="outlined">
          Edit
        </Button>

        <Button fullWidth color="error" variant="outlined">
          Delete
        </Button>
      </FlexBox>
    </Wrapper>
  );
};
export default SellerPackageCard;
