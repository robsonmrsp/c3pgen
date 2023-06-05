import Link from "next/link";
import Image from "next/image";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import { currency } from "lib";

// ==========================================================

// ==========================================================

const ProductCard2 = (props) => {
  const { thumbnail, title, price, slug } = props;
  return (
    <Link href={`/product/${slug}`}>
      <HoverBox borderRadius={2} mb={1}>
        <Image
          width={180}
          height={180}
          alt={title}
          src={thumbnail}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </HoverBox>

      <H4 fontSize={14} mb={0.5}>
        {title}
      </H4>

      <H4 fontSize={14} color="primary.main">
        {currency(price)}
      </H4>
    </Link>
  );
};
export default ProductCard2;
