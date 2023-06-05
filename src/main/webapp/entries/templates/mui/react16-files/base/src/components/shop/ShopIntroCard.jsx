import { Call, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Rating } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import FacebookFilled from "components/icons/FacebookFilled";
import InstagramFilled from "components/icons/InstagramFilled";
import TwitterFilled from "components/icons/TwitterFilled";
import YoutubeFilled from "components/icons/YoutubeFilled";
import { H3, Small, Span } from "components/Typography";

// =======================================================

// =======================================================

const ShopIntroCard = (props) => {
  const { name, phone, address, coverPicture, profilePicture } = props;
  return (
    <Card
      sx={{
        mb: 4,
        pb: 2.5,
      }}
    >
      <Box
        height="202px"
        sx={{
          background: `url(${coverPicture}) center/cover`,
        }}
      />

      <FlexBox mt={-8} px={3.75} flexWrap="wrap">
        <Avatar
          src={profilePicture}
          sx={{
            mr: "37px",
            width: "120px",
            height: "120px",
            border: "4px solid",
            borderColor: "grey.100",
          }}
        />

        <Box
          sx={{
            flex: "1 1 0",
            minWidth: "250px",
            "@media only screen and (max-width: 500px)": {
              marginLeft: 0,
            },
          }}
        >
          <FlexBetween flexWrap="wrap" mt={0.375} mb={3}>
            <Box
              my={1}
              p="4px 16px"
              borderRadius="4px"
              display="inline-block"
              bgcolor="secondary.main"
            >
              <H3 fontWeight="600" color="grey.100">
                {name}
              </H3>
            </Box>

            <FlexBox my={1} gap={1.5}>
              {socialLinks.map((item, ind) => (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={ind}
                >
                  <item.icon
                    sx={{
                      fontSize: 27,
                    }}
                  />
                </a>
              ))}
            </FlexBox>
          </FlexBetween>

          <FlexBetween flexWrap="wrap">
            <Box>
              <FlexBox alignItems="center" gap={1} mb={2}>
                <Rating color="warn" size="small" value={5} readOnly />
                <Small color="grey.600" display="block">
                  (45)
                </Small>
              </FlexBox>

              <FlexBox color="grey.600" gap={1} mb={1} maxWidth={270}>
                <Place
                  fontSize="small"
                  sx={{
                    fontSize: 18,
                    mt: "3px",
                  }}
                />
                <Span color="grey.600">{address}</Span>
              </FlexBox>

              <FlexBox color="grey.600" gap={1} mb={1}>
                <Call
                  fontSize="small"
                  sx={{
                    fontSize: 18,
                    mt: "2px",
                  }}
                />
                <Span color="grey.600">{phone}</Span>
              </FlexBox>
            </Box>

            <a href="mailto:scarletbeauty@xmail.com">
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  my: 1.5,
                }}
              >
                Contact Vendor
              </Button>
            </a>
          </FlexBetween>
        </Box>
      </FlexBox>
    </Card>
  );
};
const socialLinks = [
  {
    icon: FacebookFilled,
    url: "https://facebook.com",
  },
  {
    icon: TwitterFilled,
    url: "https://twitter.com",
  },
  {
    icon: YoutubeFilled,
    url: "https://youtube.com",
  },
  {
    icon: InstagramFilled,
    url: "https://instagram.com",
  },
];
export default ShopIntroCard;
