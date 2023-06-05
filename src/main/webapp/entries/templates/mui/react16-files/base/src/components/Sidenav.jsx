import { cloneElement, useEffect, useState } from "react";
import clsx from "clsx";
import { Box, Drawer, styled } from "@mui/material";
import Scrollbar from "components/Scrollbar";

// styled component
const Wrapper = styled(Box)({
  "& .handle": {
    cursor: "pointer",
  },
});

// ================================================================

// ================================================================

const Sidenav = (props) => {
  const {
    position,
    open,
    width = 280,
    handle,
    children,
    toggleSidenav,
  } = props;
  const [sidenavOpen, setSidenavOpen] = useState(open);
  const handleToggleSidenav = () => setSidenavOpen(!sidenavOpen);
  useEffect(() => setSidenavOpen(open), [open]);
  return (
    <Wrapper>
      <Drawer
        anchor={position}
        open={sidenavOpen}
        onClose={toggleSidenav || handleToggleSidenav}
        SlideProps={{
          style: {
            width,
          },
        }}
        sx={{
          zIndex: 15001,
        }}
      >
        <Scrollbar autoHide={false}>{children}</Scrollbar>
      </Drawer>

      {handle &&
        cloneElement(handle, {
          onClick: toggleSidenav || handleToggleSidenav,
          className: clsx(handle.props?.className, "handle"),
        })}
    </Wrapper>
  );
};

// set default component props
Sidenav.defaultProps = {
  width: 280,
  position: "left",
  open: false,
};
export default Sidenav;
