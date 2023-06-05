import { Button } from "@mui/material";
import { useRouter } from "next/router";
import SEO from "components/SEO";
import BazaarImage from "components/BazaarImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";
const Error404 = () => {
  const router = useRouter();
  const handleGoBack = () => router.back();
  const handleGoHome = () => router.push("/");
  return (
    <FlexRowCenter px={2} minHeight="100vh" flexDirection="column">
      <SEO title="Nothing found" />
      <BazaarImage
        src="/assets/images/illustrations/404.svg"
        sx={{
          display: "block",
          maxWidth: 320,
          width: "100%",
          mb: 3,
        }}
      />

      <FlexBox flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          sx={{
            m: 1,
          }}
          onClick={handleGoBack}
        >
          Go Back
        </Button>

        <Button
          variant="contained"
          onClick={handleGoHome}
          color="primary"
          sx={{
            m: 1,
          }}
        >
          Go to Home
        </Button>
      </FlexBox>
    </FlexRowCenter>
  );
};
export default Error404;
