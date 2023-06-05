import { Box, Container } from "@mui/material";
import CategorySectionHeader from "./CategorySectionHeader";

// ==============================================================

// ==============================================================

const CategorySectionCreator = (props) => {
  const { icon, title, children, seeMoreLink, ...others } = props;
  return (
    <Box mb={7.5} {...others}>
      <Container
        sx={{
          pb: "1rem",
        }}
      >
        {title && (
          <CategorySectionHeader
            title={title}
            seeMoreLink={seeMoreLink}
            icon={icon}
          />
        )}

        {children}
      </Container>
    </Box>
  );
};
export default CategorySectionCreator;
