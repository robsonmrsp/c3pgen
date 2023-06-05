import { Typography } from "@mui/material";
import LazyImage from "components/LazyImage";
import { FlexRowCenter } from "components/flex-box";

// ==============================================================

// ==============================================================

const CategoryCard2 = ({ title, imgUrl, Icon }) => {
  return (
    <FlexRowCenter flexDirection="column">
      {imgUrl ? (
        <LazyImage width={100} height={100} src={imgUrl} alt="banner" />
      ) : (
        Icon && <Icon size="48px">{Icon}</Icon>
      )}
      <Typography
        className="ellipsis"
        textAlign="center"
        fontSize="11px"
        lineHeight="1"
        mt={1}
      >
        {title}
      </Typography>
    </FlexRowCenter>
  );
};
export default CategoryCard2;
