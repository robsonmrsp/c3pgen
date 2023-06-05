import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { H2 } from "./Typography";
import useSettings from "hooks/useSettings";
import { FlexBetween, FlexBox } from "./flex-box";

// ===================================================

// ===================================================

const CategorySectionHeader = (props) => {
  const { title, seeMoreLink, icon } = props;
  const { settings } = useSettings();
  return (
    <FlexBetween mb={3}>
      <FlexBox alignItems="center" gap={1}>
        {icon && <FlexBox alignItems="center">{icon}</FlexBox>}
        <H2 fontWeight="bold" lineHeight="1">
          {title}
        </H2>
      </FlexBox>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <FlexBox alignItems="center" color="grey.600">
            View all
            {settings.direction === "ltr" ? (
              <ArrowRight fontSize="small" color="inherit" />
            ) : (
              <ArrowLeft fontSize="small" color="inherit" />
            )}
          </FlexBox>
        </Link>
      )}
    </FlexBetween>
  );
};
export default CategorySectionHeader;
