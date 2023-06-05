import { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { slideDown } from "animations/keyframes";
import clsx from "clsx";

// ============================================================

// ============================================================

export const StyledBox = styled(
  ({ children, componentHeight, fixedOn, fixed, ...rest }) => (
    <div {...rest}>{children}</div>
  )
)(({ theme, componentHeight, fixedOn, fixed }) => ({
  "& .hold": {
    zIndex: 5,
    boxShadow: "none",
    position: "relative",
  },
  "& .fixed": {
    left: 0,
    right: 0,
    zIndex: 1500,
    position: "fixed",
    top: `${fixedOn}px`,
    boxShadow: theme.shadows[2],
    transition: "all 350ms ease-in-out",
    animation: `${slideDown} 400ms ${theme.transitions.easing.easeInOut}`,
  },
  "& + .section-after-sticky": {
    paddingTop: fixed ? componentHeight : 0,
  },
}));
const Sticky = ({
  fixedOn,
  children,
  onSticky,
  containerRef,
  notifyPosition,
  notifyOnScroll,
  scrollDistance = 0,
}) => {
  const [fixed, setFixed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);
  const elementRef = useRef(null);
  const positionRef = useRef(0);
  const scrollListener = useCallback(() => {
    if (!window) return;

    // Distance of element from window top (-) minus value
    let distance = window.pageYOffset - positionRef.current;
    if (containerRef?.current) {
      let containerDistance =
        containerRef.current.offsetTop +
        containerRef.current?.offsetHeight -
        window.pageYOffset;
      if (notifyPosition && notifyOnScroll) {
        notifyOnScroll(
          distance <= notifyPosition && containerDistance > notifyPosition
        );
      }
      return setFixed(distance <= fixedOn && containerDistance > fixedOn);
    }
    if (notifyPosition && notifyOnScroll) {
      notifyOnScroll(distance >= notifyPosition);
    }
    let isFixed = distance >= fixedOn + scrollDistance;
    if (positionRef.current === 0) {
      isFixed =
        distance >= fixedOn + elementRef.current?.offsetHeight + scrollDistance;
    }
    setFixed(isFixed);
  }, [containerRef, fixedOn, notifyOnScroll, notifyPosition, scrollDistance]);
  useEffect(() => {
    if (!window) return;
    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);
  useEffect(() => {
    if (!positionRef.current) {
      positionRef.current = elementRef.current?.offsetTop;
    }
    setParentHeight(elementRef.current?.offsetHeight || 0);
  }, [children]);
  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);
  return (
    <StyledBox fixedOn={fixedOn} componentHeight={parentHeight} fixed={fixed}>
      <div
        className={clsx({
          hold: !fixed,
          fixed: fixed,
        })}
        ref={elementRef}
      >
        {children}
      </div>
    </StyledBox>
  );
};
export default Sticky;
