import Link from "next/link";
import { Small } from "components/Typography";

// ==============================================================

// ==============================================================

const NavLink2 = ({
  url,
  color,
  title = "SHOP NOW",
  borderColor = "primary.600",
}) => {
  return (
    <Link href={url}>
      <Small
        fontWeight="700"
        borderBottom={2}
        color={color}
        borderColor={borderColor}
      >
        {title}
      </Small>
    </Link>
  );
};
export default NavLink2;
