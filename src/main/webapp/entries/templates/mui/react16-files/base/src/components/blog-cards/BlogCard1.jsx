import { Box } from "@mui/material";
import format from "date-fns/format";
import { AccessTime, CommentOutlined } from "@mui/icons-material";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import { NavLink2 } from "components/nav-link";
import { H3, Paragraph } from "components/Typography";
// ===========================================================

const BlogCard1 = ({ blog }) => {
  // common icon style
  const iconStyle = {
    color: "grey.600",
    mr: "0.3rem",
    fontSize: "1rem",
  };
  return (
    <Box>
      <LazyImage
        width={588}
        height={272}
        alt="blog-image"
        src={blog.thumbnail}
        sx={{
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
          },
        }}
      />
      <Box py="1.5rem">
        <H3 lineHeight={1.3} color="secondary.900">
          {blog.title}
        </H3>

        <FlexBox alignItems="center" mt="5px">
          <FlexBox alignItems="center" mr="1.5rem">
            <AccessTime sx={iconStyle} />
            <Paragraph>
              {format(new Date(blog.createdAt), "dd MMMM, yyyy")}
            </Paragraph>
          </FlexBox>

          <FlexBox alignItems="center">
            <CommentOutlined sx={iconStyle} />
            <Paragraph>{blog.comments} comments</Paragraph>
          </FlexBox>
        </FlexBox>

        <Paragraph mt="1.2rem" mb="0.7rem">
          {blog.description}
        </Paragraph>

        <NavLink2 title="CONTINUE READING" url="#" />
      </Box>
    </Box>
  );
};
export default BlogCard1;
