import { SvgIcon } from "@mui/material";
import React from "react";
const PackageBox = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M7.40692 11.3465L20.5779 4.304L16.0004 2L2.41992 8.836L7.40692 11.3465Z" />
      <path d="M24.5773 6.3175L11.4062 13.36L15.9998 15.6725L29.5803 8.83601L24.5773 6.3175Z" />
      <path d="M15.625 16.3275L11 13.9995V19.1145L9 17.101H7V11.986L2 9.46948V23.1415L15.625 30V16.3275Z" />
      <path d="M16.375 16.3275V30L30 23.1415V9.46948L16.375 16.3275Z" />
    </SvgIcon>
  );
};
export default PackageBox;
