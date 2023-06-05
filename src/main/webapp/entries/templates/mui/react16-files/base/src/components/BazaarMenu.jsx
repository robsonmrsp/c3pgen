import { Menu } from "@mui/material";
import { Children, cloneElement, Fragment, useState } from "react";

// ===============================================================

// ===============================================================

const BazaarMenu = ({
  open,
  handler,
  children,
  direction = "left",
  shouldCloseOnItemClick = true,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (customOnClick) => () => {
    if (customOnClick) customOnClick();
    if (shouldCloseOnItemClick) handleClose();
  };
  return (
    <Fragment>
      {handler &&
        cloneElement(handler, {
          onClick: handler.props.onClick || handleClick,
        })}

      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open !== undefined ? open : !!anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction || "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction || "left",
        }}
        {...props}
      >
        {Children.map(children, (child) =>
          cloneElement(child, {
            onClick: handleMenuItemClick(child.props.onClick),
          })
        )}
      </Menu>
    </Fragment>
  );
};
export default BazaarMenu;
