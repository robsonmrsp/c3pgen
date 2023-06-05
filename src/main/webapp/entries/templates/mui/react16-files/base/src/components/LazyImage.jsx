import NextImage from "next/image";
import {
  styled,
  // bgcolor,
  // compose,
  // spacing,
  // borderRadius,
  // SpacingProps,
  // BordersProps,
} from "@mui/system";

// type Props = ImageProps & BordersProps & SpacingProps;

// compose(spacing, borderRadius, bgcolor)

const LazyImage = styled((props) => <NextImage {...props} />)({
  width: "100%",
  height: "auto",
});
export default LazyImage;
